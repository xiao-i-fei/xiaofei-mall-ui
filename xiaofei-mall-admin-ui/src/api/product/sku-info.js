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

/**
 * 查询指定商品的所有图片
 */
export function getSkuImageBySkuId(skuId) {
    return request({
        url: `/product/skuimage/${skuId}`,
        method: "get"
    })
}


// 修改sku信息
export function updateInfo(data) {
    return request({
        url: '/product/skuinfo',
        method: 'put',
        data: data
    })
}

// 查询sku信息详细
export function getInfo(skuId) {
    return request({
        url: '/product/skuinfo/' + skuId,
        method: 'get'
    })
}



