import request from '@/utils/request'

/**
 * 添加品牌和类别的关联
 */
export function addCategoryBrandRelation(categoryBrandRelation) {
    return request({
        url: `/product/internal/categorybrandrelation`,
        method: "post",
        data: categoryBrandRelation
    })
}

/**
 * 删除品牌和类别的关联
 */
export function deleteCategoryBrandRelation(id, brandId) {
    return request({
        url: `/product/internal/categorybrandrelation/${id}/${brandId}`,
        method: "delete",
    })
}

/**
 * 添加品牌和类别的关联
 */
export function queryCategoryBrandRelationByBrandId(brandId) {
    return request({
        url: `/product/internal/categorybrandrelation/${brandId}`,
        method: "get",
    })
}
