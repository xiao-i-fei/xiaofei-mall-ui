import request from "@/utils/request";

/**
 * 生成订单
 */
export function crateOrder(orderInfo){
    return request({
        url:`/order/order/auth/crate`,
        method:"post",
        data:orderInfo
    })
}

/**
 * 修改订单
 */
export function updateOrder(orderUpdate){
    return request({
        url:`/order/order/auth`,
        method:`put`,
        data:orderUpdate
    })
}

/**
 * 订单支付
 */
export function orderPay(orderReqVo){
    return request({
        url:`/order/order/auth/orderpay`,
        method:"post",
        data:orderReqVo
    })
}

/**
 * 获取订单信息
 */
export function queryOrderInfo(){
    return request({
        url:`/order/order/auth/orderinfo`,
        method:"post",
    })
}

/**
 * 获取付款信息
 */
export function payOrderInfo(orderReqVo){
    return request({
        url:`/order/order/auth/orderpay`,
        method:"get",
        params:orderReqVo
    })
}




