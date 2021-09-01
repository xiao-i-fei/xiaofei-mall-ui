import request from '@/utils/request'

/**
 * 根据查询条件查询订单信息
 */
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

/**
 * 修改订单状态
 */
 export function updateOrderStatus(orderUpdateVo){
    return request({
        url:`/order/order/internal`,
        method:'put',
        data:orderUpdateVo
    })
}

