import request from '@/utils/request'

/**
 * 查询商品详情页信息
 */
export function querySkuItemInfo(skuId) {

    return request({
        url: `/product/skuinfo/details/${skuId}`,
        method: "get",
    })
}




