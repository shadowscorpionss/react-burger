export const NORMA_API = 'https://norma.nomoreparties.space/api';

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
    return request('ingredients');
}

export function postRequest(endpoint, data) {
    return request(endpoint, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data)
    })
}

export function postOrderRequest(data) {
    return postRequest('orders', { ingredients: data });
}