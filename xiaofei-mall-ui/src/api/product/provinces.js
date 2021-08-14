import request from '@/utils/request'

/**
 * 查询所有地区信息
 */
export function queryAllProvinces() {

    return request({
        url: `/product/provinces`,
        method: "get",
    })
}




