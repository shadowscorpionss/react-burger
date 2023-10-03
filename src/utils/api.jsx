export const NORMA_API='https://norma.nomoreparties.space/api';

function checkResponse(res){
    return res.ok? res.json() : res.json().then(err=> Promise.reject(err))
}

function fetchSomeUrl(url){
    return fetch(url).then(checkResponse);
}

export function getIngredients() {
    return fetchSomeUrl(`${NORMA_API}/ingredients`);    
 }