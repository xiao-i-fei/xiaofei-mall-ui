import request from '@/utils/request'

// 查询sku信息列表
export function listInfo(query) {
  return request({
    url: '/system/info/list',
    method: 'get',
    params: query
  })
}



// 新增sku信息
export function addInfo(data) {
  return request({
    url: '/system/info',
    method: 'post',
    data: data
  })
}



// 删除sku信息
export function delInfo(skuId) {
  return request({
    url: '/system/info/' + skuId,
    method: 'delete'
  })
}
