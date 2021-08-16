import request from '@/utils/request'

/**
 * 添加属性分组信息
 */
export function addAttrGroup(attrgroup) {
    return request({
        url: `/product/internal/attrgroup/add`,
        method: 'post',
        data: attrgroup
    })
}

/**
 * 根据属性分组id修改属性分组信息
 */
export function updateAttrGroup(attrgroup) {
    return request({
        url: `/product/internal/attrgroup/update`,
        method: 'put',
        data: attrgroup
    })
}

/**
 * 根据属性分组id删除属性分组信息，包含单个删除和批量删除
 */
export function deleteAttrGroupById(attrgroupIds) {
    return request({
        url: `/product/internal/attrgroup/delete`,
        method: 'delete',
        data: attrgroupIds,
    })
}

/**
 * 查询所有的属性分组信息
 * @returns 返回请求到的数据
 */
export function queryAttrGroupById(attrgroupId) {
    return request({
        url: `/product/attrgroup/${attrgroupId}`,
        method: 'get',
    })
}

/**
 * 根据类别id查询属性分组
 * @param categoryId 类别id
 */
export function queryAttrGroupByCategoryId(categoryId) {
    return request({
        url: `/product/attrgroup/list/${categoryId}`,
        method: 'get',
    })
}

/**
 * 查询所有的属性分组信息
 * @returns 返回请求到的数据
 */
export function queryAttrGroupByPage(pageNo = 1, pageSize = 8, searchValue = "", categoryId = 0) {
    return request({
        url: `/product/attrgroup/list`,
        method: 'get',
        params: {
            pageNo: pageNo,
            pageSize: pageSize,
            searchValue: searchValue,
            catelogId: categoryId
        }
    })
}

/**
 * 查询所有的属性分组信息
 * @returns 返回请求到的数据
 */
export function queryAttrGroupWithAttr(categoryId) {
    return request({
        url: `/product/attrgroup/list/${categoryId}/withattr`,
        method: 'get',
    })
}
