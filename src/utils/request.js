/**
 * 基于axios封装的请求模块
 */

import axios from 'axios'
import JSONbig from 'json-bigint'

// 创建一个 axios 实例，说白了就是复制了一个 axios 和axios本身的功能一模一样
// 我们通过这个实例去发请求，把需要的配置配置给这个实例来处理
const request = axios.create({
    baseURL: 'http://api-toutiao-web.itheima.net/', //请求的基础路径
    // 定制后端返回的原始数据的处理 
    // data是后端返回的原始数据（未经处理的JSON格式数据）
    transformResponse: [function (data, headers) {        
        // axios默认在内部使用 JSON.parse来处理转换原始数据
        // 后端返回的数据可能不是JSON格式字符串
        // 如果不是，JSONbig.parse有可能报错 所以使用try...catch...捕获异常
        try {
            // console.log(this.data);
            return JSONbig.parse(data)

            
        } catch (error) {
            return data
            // http://api-toutiao-web.itheima.net 
            // http://10.168.1.163:8088/   
        }
    }],

})

// 请求拦截器
request.interceptors.request.use(
    // 所有请求会经过这里
    // config 是当前请求相关的配置信息对象 是可以修改的
    function (config) {
        // 可以在请求发出之前定制统一的业务功能处理
        // 例如：统一的设置token
        const user = JSON.parse(window.localStorage.getItem('user'))
        // 如果有登录用户信息，则统一设置token
        if(user){
            config.headers.Authorization = `Bearer ${user.token}`

        }

        // return config 之后才能把请求发出去
        return config
    }, 
    // 请求失败会经过这里
    function (error) {
        return Promise.reject(error)
    }
)

// 响应拦截器

// 导出请求方法
export default request

// 谁要使用谁就加载 request 模块
// import request from 'request.js'
// request.xxx
// request({
//   method: ,
//   url: ''
// })