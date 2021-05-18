<template>
<!-- 使用 router 给导航菜单开启路由模式 并且使用 index 给菜单元素添加路由跳转的路径-->
  <el-menu
      class="nav-menu"
      default-active="/"
      background-color="#002033"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :collapse = 'isCollapse'>
        <!-- <h1 class="title">1115</h1> -->
      <!-- el-menu-item 中的index不能重复 要确保唯一 -->
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/article">
        <i class="el-icon-menu"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
      <el-menu-item index="/image">
        <i class="iconfont iconimage1"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
      <el-menu-item index="/publish">
        <i class="iconfont iconpublish"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
      <el-menu-item index="/comment">
        <i class="iconfont iconcomment"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
      <el-menu-item index="/fans">
        <i class="iconfont iconfans"></i>
        <span slot="title">粉丝管理</span>
      </el-menu-item>
      <el-menu-item index="/settings">
        <i class="iconfont iconSettingscontroloptions"></i>
        <span slot="title">个人信息</span>
      </el-menu-item>

    </el-menu>
</template>

<script>
export default {
  name:'AppAside',
  components:{},
  props:['is-collapse'],
  data () {
    return {
        // isCollapse: true
    }
  },
  // 生命周期函数
  created () {
  },
  // 方法函数
  methods: {

  },
  // 计算属性
  computed: {
  }
}
</script>

<style lang='less' scoped>
.title{
    padding-top: -20px;
    padding-left: 40px;
    font-size: 20px;
    color: #cccc;
}

.nav-menu{
    .iconfont{
        margin-right: 10px;
        padding-left: 5px;
    }
}

</style>
