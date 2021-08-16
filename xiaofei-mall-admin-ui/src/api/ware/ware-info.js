import request from '@/utils/request'

/**
 * 添加仓库信息
 */
export function addWareInfo(wareInfo) {
    return request({
        url: "/ware/wareinfo/internal",
        method: "post",
        data: wareInfo
    })
}

/**
 * 根据仓库id集合删除仓库信息仓库信息
 */
export function deleteWareInfo(wareIds) {
    return request({
        url: "/ware/wareinfo/internal",
        method: "delete",
        data: wareIds
    })
}

/**
 * 修改仓库信息
 */
export function updateWareInfo(wareInfo) {
    return request({
        url: "/ware/wareinfo/internal",
        method: "put",
        data: wareInfo
    })
}

/**
 * 根据仓库id查询仓库信息
 */
export function queryWareInfoByWareId(wareId) {
    return request({
        url: `/ware/wareinfo/internal/${wareId}`,
        method: "get"
    })
}

/**
 * 分页和搜索查询仓库信息
 */
export function queryWareInfoByPage(pageNo = 1, pageSize = 8, searchValue = "") {
    return request({
        url: '/ware/wareinfo/internal',
        method: 'get',
        params: {
            pageNo: pageNo,
            pageSize: pageSize,
            searchValue: searchValue,
        }
    })
}
