import request from '@/utils/request'


/**
 * 添加会员等级信息
 */
export function addMemberLevel(memberLevel) {
    return request({
        url: `/member/memberlevel/internal`,
        method: 'post',
        data: memberLevel
    })
}

/**
 * 根据会员等级id集合删除会员等级
 */
export function deleteMemberLevelByIds(memberLevelIds) {
    return request({
        url: `/member/memberlevel/internal`,
        method: 'delete',
        data: memberLevelIds
    })
}

/**
 * 根据会员等级id修改会员等级信息
 */
export function updateMemberLevel(memberLevel) {
    return request({
        url: `/member/memberlevel/internal`,
        method: 'put',
        data: memberLevel
    })
}

/**
 * 根据会员等级id查询会员等级的信息
 */
export function queryMemberLevelById(memberLevelId) {
    return request({
        url: `/member/memberlevel/internal/${memberLevelId}`,
        method: 'get',
    })
}

/**
 * 根据分页信息和查询条件查询会员等级的基本信息
 * @returns 返回请求到的数据
 */
export function queryMemberLevelByPage(pageNo = 1, pageSize = 20, searchValue = "") {
    return request({
        url: `/member/memberlevel/internal/list`,
        method: 'get',
        params: {
            pageNo: pageNo,
            pageSize: pageSize,
            searchValue: searchValue,
        }
    })
}

