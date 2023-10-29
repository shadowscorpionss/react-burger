export const NORMA_API = "https://norma.nomoreparties.space/api";

const JSON_CONTENT_TYPE = "application/json;charset=utf-8";

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

function addData (data, options){
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

export function postRequest(endpoint, data, options={}) {    
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

export function getUser(accessToken) {
    return request(`/auth/user`,
        addAuthorization(accessToken,
            addJsonContentType(createOptions("GET"))));
}


function postAuthRequest(authEndpoint, data) {
    return postRequest(`auth/${authEndpoint}`, data);        
}


export function loginRequest(email, password) {
    return postAuthRequest("login", { email, password });
}

export function logoutRequest(refreshToken) {
    return postAuthRequest("logout", { token: refreshToken });
}

export function refreshTokens(refreshToken) {
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

export function updateUser(name, email, password, accessToken) {
    const options = addData({name,email,password}, addAuthorization(accessToken ,createOptions("PATCH")));
    return request("/auth/user",  options);
}