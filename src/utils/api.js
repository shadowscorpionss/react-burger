export const NORMA_API = "https://norma.nomoreparties.space/api";

function checkResponse(res) {
    return res.ok ? res.json() : res.json().then(err => Promise.reject(err))
}

// создаем функцию проверки на `success`
function checkSuccess(res) {
    if (res && res.success) {
        return res;
    }
    // не забываем выкидывать ошибку, чтобы она попала в `catch`
    return Promise.reject(`Что-то пошло не так: ${res}`);
};

export function request(endpoint, options) {
    return fetch(`${NORMA_API}/${endpoint}`, options)
        .then(checkResponse)
        .then(checkSuccess);
}

export function getIngredientsRequest() {
    return request("ingredients");
}

export function postRequest(endpoint, data) {
    return request(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data)
    })
}

export function postOrderRequest(data) {
    return postRequest("orders", { ingredients: data });
}

export function getUser(token) {
    return fetch(`${NORMA_API}/auth/user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        },
    }).then(checkResponse)
}


function postAuthRequest(authEndpoint, data){
    return postRequest(`auth/${authEndpoint}`, data)
    .then(checkResponse);
}


export function loginRequest(email, password) {
    return postAuthRequest("login",{email,password});
}

export function refreshTokens(token) {
    return postAuthRequest("token", {token});
}


export function registrationRequest(email, password, name) {
    return postAuthRequest("register", {email,password,name});
}


export function passwordReset(email) {
    return postRequest("password-reset",{email});
}


export function passwordRecovery(password, token) {
    return postRequest("password-reset/reset",{password,token});
}




