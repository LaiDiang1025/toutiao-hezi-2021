// 文章相关请求模块
import request from '@/utils/request'

// 获取文章列表
export const getArticles = (params) => {
    return request({
        method:"GET",
        url:'/mp/v1_0/articles',

        // Headers参数使用 headers设置 headers：{ 数据名：值,'Content-type':'Application/json'} 
        // Body参数使用 data设置
        // Query参数使用 params设置
        params
    })
}

// 获取文章频道数据
export const getArticlesChannels = (params) => {
    return request({
        method:"GET",
        url:'/mp/v1_0/channels',
    })
}


// 删除文章
export const deleteArticle = articleId => {
    return request({
        method:"DELETE",
        //接口文档中的路径参数需要在 url中传递
        url:`/mp/v1_0/articles/${articleId}`,
    })
}


// 发表文章
export const addArticle = ( data,draft = false ) =>{
    return request({
        method: 'POST',
        url: '/mp/v1_0/articles',
        params: {
            draft   //是否存入草稿
        },
        data
    })
}

// 获取指定文章
export const getArticle = articleId =>{
    return request({
        method: 'GET',
        url: `/mp/v1_0/articles/${articleId}`,
    })
}


// 编辑文章
export const updateArticle = (articleId,data,draft = false) =>{
    return request({
        method: 'PUT',
        url: `/mp/v1_0/articles/${articleId}`,
        params: {
            draft   //是否存入草稿
        },
        data
    })
}


// 修改文章评论状态
export const updateCommentStatus = (articleId,allowComment) =>{
    return request({
        method: 'PUT',
        url: '/mp/v1_0/comments/status',
        params:{
            article_id:articleId
        },
        data:{
            allow_comment: allowComment
        }
    })
}







