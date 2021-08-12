import request from '@/utils/request'

/**
 * 查询推荐信息
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
    console.log("搜索条件为：", search)
    return request({
        url: `/elasticsearch/product`,
        method: "get",
        params: {
            pageNo: pageNo,
            pageSize: pageSize,
            searchValue: search.searchValue,
            categoryId: search.categoryId,
            sort: search.sort,
            minPrice: minPrice,
            maxPrice: maxPrice
        }
    })
}

