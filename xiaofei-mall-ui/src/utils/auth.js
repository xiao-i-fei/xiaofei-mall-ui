import Cookies from 'js-cookie'

const TokenKey = 'User-Token'

const ExpiresInKey = 'User-Expires-In'

/**
 * 获取token
 * @returns {*}
 */
export function getToken() {
  return Cookies.get(TokenKey)
}

/**
 * 设置token
 * @param token token的值
 * @returns {*}
 */
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

/**
 * 移除token
 * @returns {*}
 */
export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getExpiresIn() {
  return Cookies.get(ExpiresInKey) || -1
}

export function setExpiresIn(time) {
  return Cookies.set(ExpiresInKey, time)
}

export function removeExpiresIn() {
  return Cookies.remove(ExpiresInKey)
}
