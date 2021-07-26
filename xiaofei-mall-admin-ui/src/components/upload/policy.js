import request from '@/utils/request'

export function policy() {
    return request({
        url: `/thirdpart/oss/policy`,
        method: "get",
    })
}
