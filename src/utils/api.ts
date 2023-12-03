import { ACCESS_TOKEN_PATH, REFRESH_TOKEN_PATH, deleteCookie, getCookie, setCookie } from "./cookies";

export const NORMA_API = "https://norma.nomoreparties.space/api";

const JSON_CONTENT_TYPE = "application/json;charset=utf-8";
const JSON_SIMPLE_CONTENT_TYPE = "application/json";

export interface IResSuccess {
    success?: boolean
}
export interface IResError {
    message?: string;
}

const checkResponse = <T extends IResSuccess>(res: Response): Promise<T> => {
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
const checkSuccess = async <T extends IResSuccess>(res: T): Promise<T> => {
    if (res && res.success) {
        return res;
    }
    const errObj = {
        message: (res as IResError)?.message,
        status: 200,
        additional: ""
    };
    console.log(errObj);
    // не забываем выкидывать ошибку, чтобы она попала в `catch`
    return Promise.reject(
        errObj
    );
};

export const request = async <T extends IResSuccess>(endpoint: string, options: RequestInit = {}) => {
    return fetch(`${NORMA_API}/${endpoint}`, options)
        .then<T>(checkResponse)
        .then<T>(checkSuccess);
}

export const getIngredientsRequest = <T extends IResSuccess>() => {
    return request<T>("ingredients");
}

export const postRequest = <T extends IResSuccess>(endpoint: string, data: any, options: RequestInit = {}) => {
    return request<T>(endpoint, {
        ...options,
        method: "POST",
        headers: {
            ...options.headers,
            "Content-Type": JSON_CONTENT_TYPE,
        },
        body: JSON.stringify(data)
    })
}

export const postOrderRequest = <T extends IResSuccess>(data: string[]) => {
    let options: RequestInit = {
        body: JSON.stringify({ ingredients: data }),
        method: "POST",
        headers: { "Content-Type": JSON_SIMPLE_CONTENT_TYPE }

    };
    const accessToken = getCookie(ACCESS_TOKEN_PATH);
    if (accessToken) {
        options = {
            ...options,
            headers: {
                ...options.headers,
                'Authorization': getAuthorizationString(),
            }
        };

    }
    return requestWithRefresh<T>("orders", options);
}

const getAuthorizationString = (): string => {
    return `Bearer ${getCookie(ACCESS_TOKEN_PATH)}`;
}

interface ITokens extends IResSuccess {
    accessToken?: string;
    refreshToken?: string;
}

//вспомогательная функция "попутного" сохранения токена
const saveTokens = <T extends IResSuccess>(res: T): T => {

    if (!res)
        return res;

    const tokens = res as ITokens;

    if (tokens.accessToken) {
        const accessToken = tokens.accessToken.split("Bearer ")[1];
        setCookie(ACCESS_TOKEN_PATH, accessToken);
    }

    if (tokens.refreshToken) {
        const { refreshToken } = tokens;
        localStorage.setItem(REFRESH_TOKEN_PATH, refreshToken);
    }

    return res;
}

//вспомогательная функция "попутной" очистки сохраненных токенов
const clearTokens = <T>(res: T): T => {
    deleteCookie(ACCESS_TOKEN_PATH);
    localStorage.removeItem(REFRESH_TOKEN_PATH);
    return res;
}

export const getUserRequest = async <T extends IResSuccess>() => {
    try {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": JSON_CONTENT_TYPE,
                Authorization: getAuthorizationString()
            }
        }

        const response = await requestWithRefresh<T>("auth/user", options);
        return saveTokens<T>(response);
    } catch (err) {
        return Promise.reject(err);
    }
}


export const refreshTokenRequest = async () => {
    try {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_PATH);
        const data = await request<ITokens>("auth/token", {
            method: "POST",
            headers: {
                "Content-Type": JSON_CONTENT_TYPE
            },
            body: JSON.stringify({
                token: refreshToken
            })
        });
        if (data.accessToken)
            setCookie(ACCESS_TOKEN_PATH, data.accessToken);

        return data;
    } catch (err) {
        return Promise.reject(err);
    }
};


export const requestWithRefresh = async <T extends IResSuccess>(endpoint: string, options: ResponseInit) => {
    try {
        return await request<T>(endpoint, options);
    } catch (err: any) {
        if (err.message !== "jwt expired"
            && err.message !== "invalid signature"
            && err.message !== "jwt malformed"
            && err.message !== "invalid token")
            return Promise.reject(err);

        const refreshData = await refreshTokenRequest();
        saveTokens(refreshData);

        options = {
            ...options,
            headers: {
                ...options.headers,
                'Authorization': getAuthorizationString(),
            }

        };
        return await request<T>(endpoint, options)
    }
}

const postAuthRequest = <T extends IResSuccess>(authEndpoint: string, data: any) => {
    return postRequest<T>(`auth/${authEndpoint}`, data);
}

export const loginRequest = async <T extends IResSuccess>(email: string, password: string) => {
    return postAuthRequest<T>('login', { email, password })
        .then(saveTokens);
}

export const logoutRequest = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_PATH);
    if (!refreshToken)
        return;
    return postAuthRequest("logout", { token: refreshToken })
        .then(clearTokens);
}

export const registrationRequest = async<T extends IResSuccess>(email: string, password: string, name: string) => {
    return postAuthRequest<T>("register", { email, password, name })
        .then(saveTokens);
}

export const passwordResetRequest = (email: string) => {
    return postRequest("password-reset", { email });
}

export const passwordRecoveryRequest = (password: string, token: string) => {
    return postRequest("password-reset/reset", { password, token });
}

export const updateUserRequest = async <T extends IResSuccess>(name: string, email: string, password: string) => {
    const data = { name, email, password };
    const options = {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": JSON_SIMPLE_CONTENT_TYPE,
            Authorization: getAuthorizationString(),
        }
    };
    return requestWithRefresh<T>("auth/user", options);

}

export function getCurrentOrderRequest<T extends IResSuccess>(orderNumber: string) {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": JSON_SIMPLE_CONTENT_TYPE,
        }
    };
    return request<T>(`orders/${orderNumber}`, options);
}