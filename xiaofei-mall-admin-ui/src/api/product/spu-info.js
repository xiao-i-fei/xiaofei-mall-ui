import request from '@/utils/request'

/**
 * 根据分页信息和查询条件查询spu-info
 */
export function querySpuInfoByPage(pageNo = 1, pageSize = 8, spuSearchInfo) {
    return request({
        url: `/product/spuinfo`,
        method: "get",
        params: {
            pageNo: pageNo,
            pageSize: pageSize,
            searchValue: spuSearchInfo.searchValue,
            catalogId: spuSearchInfo.catelogId,
            brandId: spuSearchInfo.brandId,
            publishStatus: spuSearchInfo.publishStatus
        }
    })
}

/**
 * 商品上架
 */
export function spuUp(spuId) {
    return request({
        url: `/product/spuinfo/${spuId}`,
        method: "put"
    })
}




