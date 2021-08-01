import request from '@/utils/request'

/**
 * 根据分页信息和查询条件查询sku-info
 */
export function querySkuInfoByPage(pageNo = 1, pageSize = 8, skuSearchVo) {

    //价格处理
    let maxPrice = skuSearchVo.maxPrice === 0 ? 999999999999 : skuSearchVo.maxPrice
    let minPrice
    if (skuSearchVo.minPrice > skuSearchVo.maxPrice) {
        let t = skuSearchVo.minPrice
        minPrice = maxPrice
        maxPrice = t
    }

    return request({
        url: `/product/skuinfo`,
        method: "get",
        params: {
            pageNo: pageNo,
            pageSize: pageSize,
            searchValue: skuSearchVo.searchValue,
            catalogId: skuSearchVo.catelogId,
            brandId: skuSearchVo.brandId,
            saleCount: skuSearchVo.saleCount,
            minPrice: minPrice,
            maxPrice: maxPrice
        }
    })
}




