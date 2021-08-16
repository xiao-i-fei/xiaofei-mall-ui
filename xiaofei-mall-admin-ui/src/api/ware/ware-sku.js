import request from '@/utils/request'

/**
 * 添加sku库存信息
 */
export function addWareSku(wareSku) {
    return request({
        url: "/ware/waresku/internal",
        method: "post",
        data: wareSku
    })
}

/**
 * 根据sku库存id集合删除sku库存信息
 */
export function deleteWareSku(wareSkuIds) {
    return request({
        url: "/ware/waresku/internal",
        method: "delete",
        data: wareSkuIds
    })
}

/**
 * 修改sku库存信息
 */
export function updateWareSku(wareSku) {
    return request({
        url: "/ware/waresku/internal",
        method: "put",
        data: wareSku
    })
}

/**
 * 根据sku的库存id查询sku库存信息
 */
export function queryWareSkuByWareSkuId(wareSkuId) {
    return request({
        url: `/ware/waresku/internal/${wareSkuId}`,
        method: "get"
    })
}

/**
 * 分页和搜索查询sku库存信息
 */
export function queryWareSkuByPage(pageNo = 1, pageSize = 8, wareSkuVo) {
    return request({
        url: '/ware/waresku/internal',
        method: 'get',
        params: {
            pageNo: pageNo,
            pageSize: pageSize,
            skuId: wareSkuVo.skuId,
            wareId: wareSkuVo.wareInfoId,
            skuName: wareSkuVo.skuName
        }
    })
}
