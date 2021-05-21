// 全局通信总线  呼叫中心  作用：可以让任何组件之间相互通信
import Vue from 'vue'

export default new Vue()

// 假设 a 组件要给 b组件 发送数据 
// 注意：通信的两端所使用的事件名称必须一致。否则是无效的

// 谁发 谁 $emit  谁接收谁 $on 

// b注册通信的事件
// import globalBus from '@/utils/global-bus'
// globalBus.$on('自定义事件名称',() =>{
//     //处理函数
// })

// a 发布通信事件
// import gloablBus from '@/utils/global-bus'
// global.$emit('自定义事件名称'，可选的数据)