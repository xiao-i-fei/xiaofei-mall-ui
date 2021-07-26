import request from '@/utils/request'

/**
 * 添加商品类别
 */
export function addCategory(category) {
    return request({
        url: `/product/category/add`,
        method: "post",
        data: category
    })
}

/**
 * 根据类别id删除商品类别
 */
export function deleteCategoryById(categoryId) {
    return request({
        url: `/product/category/${categoryId}`,
        method: 'delete',
    })
}

/**
 * 根据节点id修改节点信息
 */
export function updateCategory(category) {
    return request({
        url: `/product/category/update`,
        method: 'put',
        data: category
    })
}

/**
 * 查询所有的商品信息
 * @returns 返回请求到的数据
 */
export function queryAllCategory() {
    return request({
        url: '/product/category/list',
        method: 'get',
    })
}

/**
 * 根据id查询节点的信息
 */
export function queryById(categoryId) {
    return request({
        url: `/product/category/${categoryId}`,
        method: 'get',
    })
}

/**
 * 查询所有类别信息，以树形结构展示，用于级联选择器中使用
 */
export function listTree(){
    return request({
        url: `/product/category/list/tree`,
        method: 'get',
    })
}

