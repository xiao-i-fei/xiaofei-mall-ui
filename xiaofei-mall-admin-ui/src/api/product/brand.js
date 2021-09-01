import request from '@/utils/request'

/**
 * 添加商品信息
 */
export function addBrand(brand) {
    return request({
        url: `/product/brand/internal/add`,
        method: 'post',
        data: brand
    })
}


/**
 * 根据商家id修改商家信息
 */
export function updateBrand(brand) {
    return request({
        url: `/product/brand/internal/update`,
        method: 'put',
        data: brand
    })
}

/**
 * 根据商家id删除商家信息，包含单个删除和批量删除
 */
export function deleteBrandById(brandIds) {
    return request({
        url: `/product/internal/brand/delete`,
        method: 'delete',
        data: brandIds,
    })
}

/**
 * 查询所有的商家信息
 * @returns 返回请求到的数据
 */
export function queryBrandById(brandId) {
    return request({
        url: `/product/brand/${brandId}`,
        method: 'get',
    })
}

/**
 * 根据类别id查询商家信息
 * @returns 返回请求到的数据
 */
export function queryBrandByCategoryId(categoryId) {
    return request({
        url: `/product/brand/categoryId/${categoryId}`,
        method: 'get',
    })
}

/**
 * 查询所有的商家信息
 * @returns 返回请求到的数据
 */
export function queryBrandByPage(pageNo = 1, pageSize = 8, searchValue = "") {
    return request({
        url: `/product/brand/list`,
        method: 'get',
        params: {
            pageNo: pageNo,
            pageSize: pageSize,
            searchValue: searchValue
        }
    })
}
