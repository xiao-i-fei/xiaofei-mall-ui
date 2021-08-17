import request from '@/utils/request'

/**
 * 查询用户信息
 */
export function getMemberByToken() {
    return request({
        url: `/member/member/auth`,
        method: "get",
    })
}
