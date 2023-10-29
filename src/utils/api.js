import { ACCESS_TOKEN_PATH, REFRESH_TOKEN_PATH, deleteCookie, getCookie, setCookie } from "./cookies";

export const NORMA_API = "https://norma.nomoreparties.space/api";

const JSON_CONTENT_TYPE = "application/json;charset=utf-8";
const JSON_SIMPLE_CONTENT_TYPE = "application/json";

function checkResponse(res) {
    return res.ok ?
        res.json() :
        res.json().then(err => Promise.reject({
            //передаем статус (401, 403, 500 и тд)
            status: res.status,
            //адрес страницы с ошибкой и statusText если есть
            additional: `${res.url} ${res.statusText}`,
            //сообщение из json
            message: err.message
        }));
}

// создаем функцию проверки на `success`
function checkSuccess(res) {
    if (res && res.success) {
        return res;
    }
    // не забываем выкидывать ошибку, чтобы она попала в `catch`
    return Promise.reject(`Что-то пошло не так: ${res}`);
};


function addAuthorization(accessToken, options) {
    return {
        ...options, headers: {
            ...options.headers,
            Authorization: "Bearer " + accessToken
        }
    };
}

function addJsonContentType(options) {
    return {
        ...options,
        headers: {
            ...options.headers,
            "Content-Type": JSON_CONTENT_TYPE
        }
    }
}

function createOptions(method) {
    return {
        method: method,
    }
}

function addData(data, options) {
    return {
        ...options,
        body: JSON.stringify(data)
    }
}


export function request(endpoint, options) {
    return fetch(`${NORMA_API}/${endpoint}`, options)
        .then(checkResponse)
        .then(checkSuccess);
}

export function getIngredientsRequest() {
    return request("ingredients");
}

export function postRequest(endpoint, data, options = {}) {
    return request(endpoint, {
        ...options,
        method: "POST",
        headers: {
            ...options.headers,
            "Content-Type": JSON_CONTENT_TYPE,
        },
        body: JSON.stringify(data)
    })
}

export function postOrderRequest(data, accessToken) {
    return postRequest("orders",
        { ingredients: data },
        addAuthorization(accessToken));
}

function checkJwtExpired(err, refreshCallBack) {
    if (err.message === "jwt expired") {
        refreshTokens()
            .then((res) => {
                if (typeof refreshCallBack === 'function')
                    return refreshCallBack(res);
                return res;
            })
            .catch(err => Promise.reject(err));
    } else {
        return Promise.reject(err)
    }
}

export function getProfileDataRequest() {
    const accessToken = getCookie(ACCESS_TOKEN_PATH);
    const options = {
        method: "GET",
        headers: {
            "Content-Type": JSON_CONTENT_TYPE,
            Authorization: `Bearer ${accessToken}`
        }
    }
    const cb = (res) => getProfileDataRequest();
    return request("auth/user", options)
        .then(res => { saveTokens(res); return res })
        .catch(err => checkJwtExpired(err, cb));

}


function postAuthRequest(authEndpoint, data) {
    return postRequest(`auth/${authEndpoint}`, data);
}


function saveTokens(res) {
    const accessToken = res.accessToken.split("Bearer ")[1];
    const refreshToken = res.refreshToken;

    setCookie(ACCESS_TOKEN_PATH, accessToken);
    localStorage.setItem(REFRESH_TOKEN_PATH, refreshToken);
}

export function loginRequest(email, password) {
    return postAuthRequest("login", { email, password })
        .then(res => {
            saveTokens(res);
            return res;
        });
}

export function logoutRequest() {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_PATH);
    if (!refreshToken)
        return
    return postAuthRequest("logout", { token: refreshToken })
        .then((res) => {
            deleteCookie(ACCESS_TOKEN_PATH);
            localStorage.removeItem(REFRESH_TOKEN_PATH);
            return res;
        });
}

export function refreshTokens() {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_PATH);
    if (!refreshToken)
        return;

    return postAuthRequest("token", { token: refreshToken });
}

export function registrationRequest(email, password, name) {
    return postAuthRequest("register", { email, password, name });
}

export function passwordReset(email) {
    return postRequest("password-reset", { email });
}

export function passwordRecovery(password, token) {
    return postRequest("password-reset/reset", { password, token });
}



export function updateUser(name, email, password) {
    const accessToken = getCookie(ACCESS_TOKEN_PATH);
    const data = { name, email, password };
    const options = {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": JSON_SIMPLE_CONTENT_TYPE,
            Authorization: `Bearer ${accessToken}`,
        }
    };
    var cb = (res) => updateUser(name, email, password);
    return request("auth/user", options).catch((err) => checkJwtExpired(err, cb));
}