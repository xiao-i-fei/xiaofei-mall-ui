import request from '@/utils/request'

/**
 * 添加属性信息
 */
export function addAttr(attr) {
    return request({
        url: `/product/internal/attr`,
        method: 'post',
        data: attr
    })
}

/**
 * 根据属性id修改属性信息
 */
export function updateAttr(attr) {
    return request({
        url: `/product/internal/attr`,
        method: 'put',
        data: attr
    })
}

/**
 * 根据属性id删除属性信息，包含单个删除和批量删除
 */
export function deleteAttrById(attrIds) {
    return request({
        url: `/product/internal/attr`,
        method: 'delete',
        data: attrIds,
    })
}

/**
 * 根据属性id查询属性信息
 * @returns 返回请求到的数据
 */
export function queryAttrById(attrId) {
    return request({
        url: `/product/attr/${attrId}`,
        method: 'get',
    })
}

/**
 * 根据分页信息和查询条件查询属性的基本信息
 * @returns 返回请求到的数据
 */
export function queryAttrByPage(pageNo = 1, pageSize = 8, searchValue = "", categoryId = 0, attrType = -1) {
    return request({
        url: `/product/attr/list/${attrType}`,
        method: 'get',
        params: {
            pageNo: pageNo,
            pageSize: pageSize,
            searchValue: searchValue,
            catelogId: categoryId
        }
    })
}
