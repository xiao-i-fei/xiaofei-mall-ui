import request from '@/utils/request'

/**
 * 修改指定的spu的基本属性
 * @returns 返回请求到的数据
 */
export function updateProductAttrValue(productAttrValues, spuId) {
    return request({
        url: `/product/productattrvalue/${spuId}`,
        method: 'put',
        data: productAttrValues
    })
}

/**
 * 根据spuId查询spu属性
 * @returns 返回请求到的数据
 */
export function queryProductAttrValueBySpuId(spuId) {
    return request({
        url: `/product/productattrvalue/${spuId}`,
        method: 'get',
    })
}
