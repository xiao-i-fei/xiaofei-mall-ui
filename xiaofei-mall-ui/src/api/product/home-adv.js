import request from '@/utils/request'

/**
 * 根据分页查询广告信息
 * @returns 返回请求到的数据
 */
export function queryAdvByPage(pageNo = 1, pageSize = 40, searchValue = "") {
    return request({
        url: `/product/adv`,
        method: 'get',
        params: {
            pageNo: pageNo,
            pageSize: pageSize,
            searchValue: searchValue
        }
    })
}
