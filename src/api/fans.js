// 粉丝管理模块
import request from '@/utils/request'

// 获取粉丝列表
export const uploadFans = ()=> {
    return request({
        method:'GET',
        url:'/mp/v1_0/followers'
    })
}