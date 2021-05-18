<template>
  <div class='comment-container'>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
        </div>
        <el-table
            class= "table-list"
            :data= "article"
            style="width: 100%"
            stripe>
            <el-table-column
                prop="title"
                label="标题"
                width="180">
            </el-table-column>
            <el-table-column
                prop="total_comment_count"
                label="总评论数"
                width="180">
            </el-table-column>
            <el-table-column
                prop="fans_comment_count"
                label="粉丝评论数">
            </el-table-column>
            <el-table-column
                prop="comment_status"
                label="评论状态">
                <template slot-scope="scope">
                    {{scope.row.comment_status ? '正常':'关闭'}}

                </template>
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.comment_status"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        @change= "onStatusChange(scope.row)"
                        :disabled = 'scope.row.statusDisabled'>
                    </el-switch>
                </template>
            </el-table-column>
        </el-table>

        <!-- 绑定页码、绑定每页大小、current-page控制激活的页码，初始是1、page-size控制可选的每页大小 -->
        <el-pagination
            @size-change= "handleSizeChange"
            @current-change= "handleCurrentChange"
            :current-page.sync= "page"
            :page-sizes="[10, 20, 30, 40]"
            :page-size.sync= "pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total= "totalCount"
            background>
        </el-pagination>    
    </el-card>
  </div>
</template>

<script>
import { getArticles,updateCommentStatus } from '@/api/article'
export default {
  name:'CommentIndex',
  components:{},
  data () {
    return {
        article:[],  //文章数据列表
        totalCount: 0,  //总数据条数
        pageSize: 10,
        page:1 //当前激活的页码
    }
  },
  // 生命周期函数
  created () {
      this.loadArticle()

  },
  // 方法函数
  methods: {
      loadArticle(page = 1){
        //   让分页激活的页码和请求数据的页码保持一致
          this.page = page
          getArticles({
              response_type: 'comment',
              page,
              per_page: this.pageSize

          }).then(res =>{
            //   console.log(res);
            const {results} = res.data.data
            results.forEach(article =>{
                article.statusDisabled = false
            })
            this.article = results
            this.totalCount = res.data.data.total_count

          })

      },
      onStatusChange(article){
        //   禁用开关
          article.statusDisabled = true
        // 请求提交修改
        updateCommentStatus(article.id.toString(),article.comment_status)
            .then(res =>{
                // console.log(res);
                // 启用开关
                article.statusDisabled = false
                this.$message({
                    type:"success",
                    message: article.comment_status ? '开启文章评论状态' : '关闭成功'
                })

            })



      },
      handleSizeChange() {
          this.loadArticle(1)

        
      },
      handleCurrentChange(page) {
        // 页码改变，加载指定页码数据
        this.loadArticle(page)
      }
  },
  // 计算属性
  computed: {
  }
}
</script>

<style lang='less' scoped>
    .table-list{
        margin-bottom: 20px;
          
    }

</style>
