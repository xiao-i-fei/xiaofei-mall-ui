import request from '@/utils/request'


// 新增【请填写功能名称】
export function addAdv(data) {
  return request({
    url: '/product/adv/internal',
    method: 'post',
    data: data
  })
}


// 删除【请填写功能名称】
export function delAdv(advId) {
  return request({
    url: '/product/adv/internal/' + advId,
    method: 'delete'
  })
} 

// 修改【请填写功能名称】
export function updateAdv(data) {
  return request({
    url: '/product/adv/internal',
    method: 'put',
    data: data
  })
}

// 查询【请填写功能名称】详细
export function getAdv(advId) {
  return request({
    url: '/product/adv/' + advId,
    method: 'get'
  })
}

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
 

