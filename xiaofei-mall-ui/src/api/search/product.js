import request from '@/utils/request'

/**
 * 查询推荐信息
 */
export function scrollLoadingProducts(pageNo = 0, pageSize = 10, brandId = 0, categoryId = 0) {
    return request({
        url: `/elasticsearch/product/scroll/loading/products`,
        method: "get",
        params: {
            pageNo: pageNo,
            pageSize: pageSize,
            brandId: brandId,
            categoryId: categoryId
        }
    })
}

/**
 * 滚动加载获取商品信息
 */
export function getProductRandom(brandId = 0, categoryId = 0) {
    return request({
        url: `/elasticsearch/product/random/product`,
        method: "get",
        params: {
            brandId: brandId,
            categoryId: categoryId
        }
    })
}

/**
 * 根据搜索条件查询商品信息
 */
export function getProductBySearch(search, pageNo = 1, pageSize = 40) {

    let minPrice = search.minPrice === "" ? 0 : search.minPrice
    let maxPrice = search.maxPrice === "" ? 9999999999 : search.maxPrice
    if (minPrice > maxPrice) {
        let t = minPrice
        minPrice = maxPrice
        maxPrice = t
    }
    return request({
        url: `/elasticsearch/product`,
        method: "get",
        params: {
            pageNo: pageNo,
            pageSize: pageSize,
            searchValue: search.searchValue,
            categoryId: search.categoryId,
            brandId: search.brandId,
            attrId:search.attrId,
            sort: search.sort,
            minPrice: minPrice,
            maxPrice: maxPrice
        }
    })
}

/**
 * 根据指定字段排序
 *
 * @param pageNo     当前页
 * @param pageSize   每页显示数量
 * @param orderField 排序字段
 * @param sortOrder  0：升序。1：降序
 * @return 返回查询到商品信息
 */
export function getProductByOrder(pageNo = 0, pageSize = 5, orderField, sortOrder = 1) {
    return request({
        url: `/elasticsearch/product/order`,
        method: "get",
        params: {
            pageNo: pageNo,
            pageSize: pageSize,
            orderField: orderField,
            sortOrder: sortOrder
        }
    })
}


