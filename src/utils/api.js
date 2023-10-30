import { ACCESS_TOKEN_PATH, REFRESH_TOKEN_PATH, deleteCookie, getCookie, setCookie } from "./cookies";

export const NORMA_API = "https://norma.nomoreparties.space/api";

const JSON_CONTENT_TYPE = "application/json;charset=utf-8";
const JSON_SIMPLE_CONTENT_TYPE = "application/json";

function checkResponse(res) {
    return res.ok ?
        res.json() :
        res.json().then(err =>
            Promise.reject({
                //передаем статус (401, 403, 500 и тд)
                status: res.status,
                //адрес страницы с ошибкой и statusText если есть
                additional: `${res.url} ${res.statusText}`,
                //сообщение из json
                message: err.message
            })
        );
}

// создаем функцию проверки на `success`
function checkSuccess(res) {
    if (res && res.success) {
        return res;
    }
    // не забываем выкидывать ошибку, чтобы она попала в `catch`
    return Promise.reject({ message: res.message, status: 200, additional: "" });
};

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

export function postOrderRequest(data) {
    let options = {};
    const accessToken = getCookie(ACCESS_TOKEN_PATH);
    if (accessToken) {
        options = {
            headers: {
                Authorization: getAuthorizationString()
            }
        }
    }
    return postRequest("orders",
        { ingredients: data }, options);
}

function isFunction(fn) {
    return typeof (fn) === "function";
}

function callFnOrReturnArg(fn, arg) {
    return isFunction(fn) ? fn(arg) : arg;
}

function getAuthorizationString() {
    return `Bearer ${getCookie(ACCESS_TOKEN_PATH)}`;
}

//вспомогательная функция "попутного" сохранения токена
function saveTokens(res) {

    if (!res)
        return res;

    if (res.accessToken) {
        const accessToken = res.accessToken.split("Bearer ")[1];
        setCookie(ACCESS_TOKEN_PATH, accessToken);
    }

    if (res.refreshToken) {
        const refreshToken = res.refreshToken;
        localStorage.setItem(REFRESH_TOKEN_PATH, refreshToken);
    }

    return res;
}

//вспомогательная функция "попутной" очистки сохраненных токенов
function clearTokens(res) {
    deleteCookie(ACCESS_TOKEN_PATH);
    localStorage.removeItem(REFRESH_TOKEN_PATH);

    return res;
}

export async function getUserRequest() {
    try {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": JSON_CONTENT_TYPE,
                Authorization: getAuthorizationString()
            }
        }

        const response = await requestWithRefresh("auth/user", options);
        return saveTokens(response);
    } catch (err) {
        return Promise.reject(err);
    }
}


export async function refreshTokenRequest() {
    try {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_PATH);
        const data = await request("auth/token", {
            method: "POST",
            headers: {
                "Content-Type": JSON_CONTENT_TYPE
            },
            body: JSON.stringify({
                token: refreshToken
            })
        });

        setCookie(ACCESS_TOKEN_PATH, data.accessToken);
        return data;
    } catch (err) {
        return Promise.reject(err);
    }
};


export async function requestWithRefresh(endpoint, options) {
    try {
        return await request(endpoint, options);
    } catch (err) {
        if (err.message !== "jwt expired"
            && err.message !== "invalid signature"
            && err.message !== "invalid token")
            return Promise.reject(err);

        const refreshData = await refreshTokenRequest();
        saveTokens(refreshData);
        options.headers.Authorization = getAuthorizationString();

        return await request(endpoint, options)
    }
}

function postAuthRequest(authEndpoint, data) {
    return postRequest(`auth/${authEndpoint}`, data);
}

export function loginRequest(email, password) {
    return postAuthRequest("login", { email, password })
        .then(saveTokens);
}

export function logoutRequest() {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_PATH);
    if (!refreshToken)
        return;
    return postAuthRequest("logout", { token: refreshToken })
        .then(clearTokens);
}

export function registrationRequest(email, password, name) {
    return postAuthRequest("register", { email, password, name })
        .then(saveTokens);
}

export function passwordResetRequest(email) {
    return postRequest("password-reset", { email });
}

export function passwordRecoveryRequest(password, token) {
    return postRequest("password-reset/reset", { password, token });
}

export async function updateUserRequest(name, email, password) {
    const data = { name, email, password };
    const options = {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": JSON_SIMPLE_CONTENT_TYPE,
            Authorization: getAuthorizationString(),
        }
    };
    return requestWithRefresh("auth/user", options);

}