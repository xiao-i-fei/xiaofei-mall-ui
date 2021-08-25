import request from '@/utils/request'


export function queryAllByPage(orderQuery,pageNo = 1,pageSize = 10){
    return request({
        url:`/order/orderitem/internal/orderitems`,
        method:'get',
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
