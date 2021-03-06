// 素材管理模块
import request from '@/utils/request'

// 上传图片
export const uploadImage = (data) =>{
    return request({
        method:'POST',
        url:'/mp/v1_0/user/images',
        //一般文件上传的请求头中的Content-Type设置为multipart/form-data,但是我们使用axios上传的话不需要自己设置，
        //只需要给data一个FormData 对象即可
        data
    })
}

// 获取用户图片素材
export const getImages = (params) =>{
    return request({
        method:'GET',
        url:'/mp/v1_0/user/images',
        params
    })
}


// 收藏/取消收藏图片素材
export const collectImage = (imageId,collect) =>{
    return request({
        method:'PUT',
        url:`/mp/v1_0/user/images/${imageId}`,
        data:{
            collect
        }
    })
}

//删除图片素材
export const deleteImage = imageId =>{
    return request({
        method:'DELETE',
        url:`/mp/v1_0/user/images/${imageId}`
    })
}


