
/**
* 添加 Cookie
* @param {[string]} name [Cookie 的名称]
* @param {[string]} value [Cookie 的值]
* @param {[number]} daysToLive [Cookie 的过期时间]
*/
export function setCookie(name, value, daysToLive) {
    let date = new Date();
    date.setTime(date.getTime() + (daysToLive * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + "; " + expires;
}

/**
* 获取 Cookie
* @param {[string]} name [Cookie 的名称]
*/
export function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(nameEQ) != -1) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

/**
* 删除 Cookie
* @param {[string]} name [Cookie 的名称]
*/
export function deleteCookie(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';

    // document.cookie = name + '=; Max-Age=-99999999;'; // IE
    // document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'; // FF, Chrome, Opera
}   