<template>
  <div class='image-container'>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to= "{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>素材管理</el-breadcrumb-item>
            </el-breadcrumb>        
        </div>

        <!-- 图片列表 -->
        <ImageList></ImageList>

     </el-card>
  </div>
</template>

<script>
import ImageList from './components/image-list'
export default {
  name:'ImageIndex',
  components:{
      ImageList
  },
  data () {
    return {
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

</style>

