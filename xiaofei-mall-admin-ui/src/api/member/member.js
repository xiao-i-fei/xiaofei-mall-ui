import request from '@/utils/request'


/**
 * 管理员获取所有的用户列表
 */
export function queryMemberByPage(memberQuery,pageNo = 1,pageSize = 10) {
    //封装查询信息
    return request({
        url: `/member/member/internal`,
        method: 'get',
        params:{
            pageNo:pageNo,
            pageSize:pageSize
            // 其他查询条件后续再添加
        }
    })
}

/**
 * 修改会员状态
 */
 export function updateMemberStatus(memberUpdate) {
    //封装查询信息
    return request({
        url: `/member/member/internal`,
        method: 'put',
        data:memberUpdate
    })
}
