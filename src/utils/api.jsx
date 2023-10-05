export const NORMA_API='https://norma.nomoreparties.space/api';

function checkResponse(res){
    return res.ok? res.json() : res.json().then(err=> Promise.reject(err))
}

function fetchSomeUrl(url, fetchOptions){
    return fetch(url, fetchOptions).then(checkResponse);
}

export function getIngredients() {
    return fetchSomeUrl(`${NORMA_API}/ingredients`);    
 }

function postSomeUrl(url, data){
    return fetchSomeUrl(url, {method: 'POST',
    headers: {
        "Content-Type": "application/json",
    },    
     body: JSON.stringify(data)})
}

export function postOrder(data){    
    return postSomeUrl(`${NORMA_API}/orders`, {ingredients:data});
}