import request from "@/utils/request";

/**
 * 添加收获地址
 */
export function addMemberAddress(addressInfo) {
    return request({
        url: `/member/receiveaddress/auth`,
        method: "post",
        data: addressInfo
    })
}

/**
 * 根据收货地址id删除收货地址
 */
export function deleteAddress(id) {
    return request({
        url: `/member/receiveaddress/auth/${id}`,
        method: "delete"
    })
}

/**
 * 修改收获地址信息
 */
export function updateAddress(address) {
    return request({
        url: `/member/receiveaddress/auth`,
        method: "put",
        data:address,
    })
}

/**
 * 根据收获地址id查询收获地址信息
 */
export function getReceiveAddressById(id) {
    return request({
        url: `/member/receiveaddress/auth/receiveaddressinfo/${id}`,
        method: 'get'
    })
}
