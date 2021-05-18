// 项目的启动入口
import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 加载elementUI组件库
import ElementUI from 'element-ui'
// 加载elementUI组件库的样式
import 'element-ui/lib/theme-chalk/index.css'
// import JSONbig from 'json-bigint'

// JSON.parse()
// JSON.stringif
// 会把超出js安全整数范围的数字转为一个类型为bigNumber的对象
// 使用的时候需要把这个BigNumber.toString()就能得到正确的数据了
// JSONbig.parse()
// JSONbig.stringify()

// 加载全局样式
import './styles/index.less'

// 全局注册element组件库
Vue.use(ElementUI)

Vue.config.productionTip = false

// 创建 Vue 根实例
// 把 router 配置到根实例中
// 通过 render 方法把 App 根组件渲染到 #app 入口节点
new Vue({
    router,
    render: h => h(App)
      // el: '#app' // 等价于 $mount('#app')
}).$mount('#app')