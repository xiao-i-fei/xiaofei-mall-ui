import request from '@/utils/request'

/**
 * 修改用户信息
 */
export function updateMemberInfo(memberUpdate) {
    return request({
        url: `/member/member/auth`,
        method: "put",
        data:memberUpdate
    })
}

/**
 * 查询用户信息
 */
export function getMemberByToken() {
    return request({
        url: `/member/member/auth`,
        method: "get",
    })
}

/**
 * 查询用户信息
 */
export function updateMemberPassword(memberPassword) {
    return request({
        url: `/member/member/auth/update/password`,
        method: "put",
        data:memberPassword
    })
}


/**
 * 用户查询用户的具体信息和其他的订单、优惠券等信息
 */
export function queryMemberDetailInfo() {
    return request({
        url: `/member/member/auth/querymemberdetailinfo`,
        method: "get",
    })
}
