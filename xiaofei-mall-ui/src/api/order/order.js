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
 * 获取订单信息
 */
export function queryOrderInfo(){
    return request({
        url:`/order/order/auth/orderinfo`,
        method:"post",
    })
}


