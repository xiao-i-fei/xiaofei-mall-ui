import request from '@/utils/request'

/**
 * 添加属性和属性分组的关联
 */
export function addAttrAttrGroupRelation(attrAttrGroupRelation) {
    return request({
        url: `/product/attrattrgrouprelation`,
        method: "post",
        data: attrAttrGroupRelation
    })
}

/**
 * 删除属性和属性分组的关联
 */
export function deleteAttrAttrGroupRelation(attrAttrGroupRelations) {
    return request({
        url: `/product/attrattrgrouprelation`,
        method: "delete",
        data: attrAttrGroupRelations
    })
}

/**
 * 添加属性和属性分组的关联
 */
export function queryAttrAttrGroupRelationByAttrGroupId(attrGroupId) {
    return request({
        url: `/product/attrattrgrouprelation/${attrGroupId}`,
        method: "get",
    })
}

export function queryNoRelationAttr(pageNo = 1, pageSize = 8, searchValue = "") {
    return request({
        url: `/product/attrattrgrouprelation`,
        method: "get",
        params: {
            pageNo: pageNo,
            pageSize: pageSize,
            searchValue: searchValue
        }
    })
}
