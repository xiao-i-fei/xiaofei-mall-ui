import request from "@/utils/request";

export function queryOrderItem(orderQuery, pageNo = 1, pageSize = 10) {
    return request({
        url: `/order/orderitem/auth/orderitems`,
        method: "get",
        params: {
            orderId:orderQuery.orderId,
            orderSn:orderQuery.orderSn,
            orderStatus:orderQuery.orderStatus,
            addTime:orderQuery.addTime,
            pageNo: pageNo,
            pageSize: pageSize
        }
    })
}
