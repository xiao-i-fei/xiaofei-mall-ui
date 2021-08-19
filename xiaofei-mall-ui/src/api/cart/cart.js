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
export function deleteCart(cartId) {
    return request({
        url: `/cart/auth/${id}`,
        method: 'delete',
    })
}

/**
 * 修改购物车信息
 */
export function updateCart(cartReq) {
    return request({
        url: `/cart/auth`,
        method: 'update',
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
