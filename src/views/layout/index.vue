<template>
    <!-- 单页面应用主页 -->
   <el-container class="layout-container">
       <!-- 侧边栏 -->
        <el-aside width='auto' class="aside" >
            <!-- 渲染侧边栏组件 -->
            <app-aside class="aside-menu" :is-collapse= 'isCollapse' />
        </el-aside>
        <!-- 右侧主题部分 -->
        <el-container>
            <!-- 头部区域 -->
            <el-header class="header">
                <div>
                    <!-- :class样式处理{
                        css类名：布尔值
                    }
                    true：作用这个类名  false：不作用
                     -->
                    <i :class= '{"el-icon-s-fold":!isCollapse,"el-icon-s-unfold": isCollapse}' @click= "isCollapse = !isCollapse"></i>
                    <span class="header-title">111111111115</span>
                </div>
                <el-dropdown>
                    <div class="avatar-wrap">
                        <img :src= "user.photo" alt="" class="avatar">
                        <span>{{user.name}}</span>
                        <i class="el-icon-arrow-down el-icon--right"></i>

                    </div>
                    <!-- <span>
                        下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                    </span> -->
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>设置</el-dropdown-item>
                        <!-- 组件默认不识别原生事件，除非内部做了处理 -->
                        <!-- 在一个组件的根元素上直接监听一个原生事件 可以使用v-on的.native修饰符 -->
                        <el-dropdown-item @click.native= "onLogout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>

            </el-header>
            <!-- 主体内容区域 -->
            <el-main class="main">
                <!-- 子路由出口 -->
                <router-view /> 
            </el-main>
        </el-container>
    </el-container> 
</template>

<script>
import AppAside from './components/aside'
import { getUserProfile } from '@/api/user'
export default {
  name:'LayoutIndex',
  components:{
      AppAside
  },
  data () {
    return {
        user:{},    //当前登录用户的信息
        isCollapse: true   //侧边菜单栏的展示状态
    }
  },
  // 生命周期函数
  created () {
    //   组件初始化好，请求获取用户资料
      this.loadUserPrfile()
  },
  // 方法函数
  methods: {
    //   除了登录接口，其他所有接口都需要授权才能使用
    // 或者说除了登录接口，其他接口都需要提供身份令牌才能获取数据
      loadUserPrfile(){
          getUserProfile().then(res =>{
              this.user = res.data.data
          })
      },
      onLogout(){
        //   提示信息方法一
        // this.$confirm('确认退出？')
        //     .then(_ => {
        //         // 把用户的登录状态清除
        //         window.localStorage.removeItem('user')

        //         // 然后跳转到登录页面
        //         this.$router.push('/login')

        //     })
        //     .catch(_ => {});

        // 退出提示方法二
        this.$confirm('确认退出系统？, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            // 把用户的登录状态清除
            window.localStorage.removeItem('user')

            // 然后跳转到登录页面
            this.$router.push('/login'),
            this.$message({
                type: 'success',
                message: '退出成功'
            });
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消退出'
            });          
        });    

      }
  },
  // 计算属性
  computed: {
  }
}
</script>

<style lang='less' scoped>
    .layout-container{
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
    .aside{
        width: 100px;
        background:#D3DCE6;
        .aside-menu{
            height: 100%;
        }
    }

    .header{
        height: 60px;
        display: flex;
        justify-content:space-between;
        align-items: center;
        // background: #B3C0D1;
        border-bottom: 1px solid #ccc;
        .header-title{
            margin-left: 5px;
        }
    }

    .main{
        background: #E9EEF3;
    }

    .avatar-wrap{
        display: flex;
        align-items: center;
        .avatar{
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }

        span{
            margin-left: 5px;
        }
    }


</style>
