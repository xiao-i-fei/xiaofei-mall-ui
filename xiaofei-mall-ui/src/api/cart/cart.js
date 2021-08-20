import request from "@/utils/request";

/**
 * 添加购物车
 * @param cartReq 添加购物车的信息
 */
export function addCart(cartReq) {
    return request({
        url: `/cart/auth`,
        method: 'post',
        data: cartReq
    })
}

/**
 * 删除购物车信息
 */
export function deleteCart(ids) {
    return request({
        url: `/cart/auth`,
        method: 'delete',
        data: ids
    })
}

/**
 * 全选和全不选
 */
export function cartCheckAll(checkAll) {
    return request({
        url: `/cart/auth/checkall/${checkAll}`,
        method: 'put',
    })
}

/**
 * 修改购物车信息
 */
export function updateCart(cartReq) {
    return request({
        url: `/cart/auth`,
        method: 'put',
        data: cartReq
    })
}

/**
 * 根据购物车id查询购物车信息
 */
export function queryCartById(cartId) {
    return request({
        url: `/cart/auth/${cartId}`,
        method: "get"
    })
}

/**
 * 根据用户id查询用户信息
 */
export function queryCartByUserId() {
    return request({
        url: `/cart/auth`,
        method: "get"
    })
}
