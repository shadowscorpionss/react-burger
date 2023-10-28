export function setCookie(name, value, options = {}) {
    
    //обязательно указываем область действия для печеньки - корень сайта
    //чтобы нигде не потерялась =)
    options = {
        path: "/",
        ...options
    };

    //если установлена дата устаревания - переводим в UTC
    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    //кодируем в православный УРИ имя и значение
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    //далее какая-то магия =)
    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }
    //вот именно здесь сохраняется печенька
    document.cookie = updatedCookie;
}

export function getCookie(name) {
    const matches = document.cookie.match(
        new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name) {
    setCookie(name, "", {
        "max-age": -1
    })
}