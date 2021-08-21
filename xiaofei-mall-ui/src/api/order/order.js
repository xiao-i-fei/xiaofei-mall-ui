import request from "@/utils/request";

/**
 * 获取订单信息
 */
export function queryOrderInfo(){
    return request({
        url:`/order/order/auth/orderinfo`,
        method:"post",
    })
}
