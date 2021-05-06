import Vue from 'vue'
import VueRouter from 'vue-router'

// 在vue/cli创建的項目中 @表示 src 目录
// 它是src目录的路径别名 好处就是不受当前路径影响
// 注意：后面还需要加/   建议：如果需要父级路径查找的都使用@
import Login from '@/views/login/index.vue'


Vue.use(VueRouter)

// 路由配置表
const routes = [{
    path: '/login',
    name: 'login',
    component: Login
}]

const router = new VueRouter({
    routes
})

export default router