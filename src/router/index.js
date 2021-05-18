import Vue from 'vue'
import VueRouter from 'vue-router'

// 在vue/cli创建的項目中 @表示 src 目录
// 它是src目录的路径别名 好处就是不受当前路径影响
// 注意：后面还需要加/   建议：如果需要父级路径查找的都使用@
import Login from '@/views/login/'
import Home from '@/views/home/'
import Layout from '@/views/layout/'
import Article from '@/views/article/'
import Publish from '@/views/publish/'
import Image from '@/views/image/'
import Comment from '@/views/comment/'
import Settings from '@/views/settings/'


Vue.use(VueRouter)

// 路由配置表
const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        // 命名路由 layout 有一个默认子路由，这个路由没有意义 所以会警告
        // 正确做法：如果有默认子路由，就不要给父路由起名字
        path:'/',
        // name:'layout',
        component: Layout,
        children:[
            {
                path:'',  //path为空， 会作为默认子路由
                name:'home',
                component: Home
        
            },
            {
                path:'/article',
                name:'acticle',
                component: Article
            },
            {
                path:'/publish',
                name:'publish',
                component: Publish
            },
            {
                path:'/image',
                name:'image',
                component: Image
            },
            {
                path:'/comment',
                name:'comment',
                component: Comment
            },
            {
                path:'/settings',
                name: 'settings',
                component: Settings
            }
        

        ]

    },

]

const router = new VueRouter({
    routes
})


// 路由导航守卫(拦截器) 控制页面的访问状态  
// beforeEach是全局前置守卫 说白了所有页面的导航都会经过这里
// 守卫页面的导航
// to: 要去的路由信息
// from: 从哪儿来的路由信息
// next: 放行方法
router.beforeEach((to, from, next) => {
    // 如要要访问的页面不是 /login,校验登录状态
    // 如果没有登录，则跳转到登录页面
    // 如果登录了，则允许通过

    const user = JSON.parse(window.localStorage.getItem('user'))

    // 校验非登录页面的登录状态
    if (to.path !== '/login'){
        if (user) {
           // 已登录，允许通过
            next()
        }else{
           // 没有登录的话，跳转到登录页面
            next('/login')
        }
    }else{
       // 登录页面，正常允许通过
        next()
    }
  })

export default router

