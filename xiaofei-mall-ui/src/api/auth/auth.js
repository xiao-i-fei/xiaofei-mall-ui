import request from '@/utils/request'

/**
 * 发送验证码
 */
export function sendEmailCode(email) {
    return request({
        url: `/user/sendSimpleEmail`,
        method: "post",
        data: {registerEmail: email}
    })
}

/**
 * 用户注册
 */
export function userRegister(userInfo) {
    return request({
        url: `/user/register`,
        method: "post",
        data: userInfo
    })
}

/**
 * 用户登录
 */
export function userLogin(userInfo) {
    return request({
        url: `/user/login`,
        method: "post",
        data: userInfo
    })
}

/**
 * 用户注销
 */
export function logout() {
    return request({
        url: `/user/auth/logout`,
        method: "delete"
    })
}
