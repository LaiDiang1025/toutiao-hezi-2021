<template>
  <div class='article-container'>
    <el-card class="filter-card">
        <div slot="header" class="clearfix">
            <!-- 面包屑路径导航 -->
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>内容管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    <!-- 数据筛选表单 -->
    <el-form ref="form" :model="form" label-width="50px" size="mini">
        <el-form-item label="状态">
            <!-- el-radio 默认把 label 作为文本和选中之后的value -->
            <el-radio-group v-model="status">
            <el-radio :label= "null">全部</el-radio>
            <el-radio :label= "0">草稿</el-radio>
            <el-radio :label= "1">待审核</el-radio>
            <el-radio :label= "2">审核通过</el-radio>
            <el-radio :label= "3">审核失败</el-radio>
            <el-radio :label= "4">已删除</el-radio>
            </el-radio-group>
        </el-form-item>


        <el-form-item label="频道">
            <el-select v-model= "channelId" placeholder="请选择频道">
                <el-option  label= "全部" :value= "null"></el-option>
                <el-option v-for= "channel in channels" :key="channel.id" :label="channel.name" :value= "channel.id"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="日期">
            <el-date-picker
            v-model= "rangeDate"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format= 'yyyy-MM-dd'
            value-format= 'yyyy-MM-dd'>
            </el-date-picker>        
        </el-form-item>

        <el-form-item>
            <!-- button按钮的click事件有个默认参数，当没有指定参数，会默认传递一个无用参数 -->
            <el-button type="primary" @click= "loadArticle(1)" :loading= "loading">筛选</el-button>
        </el-form-item>
    </el-form>
    </el-card>

    <el-card class="box-card">
        <div slot="header" class="clearfix">
            根据筛选条件共查询到 {{ totalCount}} 条数据:
        </div>
        <!-- 数据列表 -->
        <!-- Table 表格组件
            1.把你需要展示的数据列表数据绑定给 table 组件的data属性
                注意：不需要去v-for，内部自动遍历
            2.设计表格列 el-table-column 
                width可以设定表格列的宽度
                label可以设置列的标题
                prop 用来设定要渲染的列表项数据字段 默认只能展示文本
            3.表格列默认只能渲染普通文本，如果需要展示其他内容(按钮，图片)
                自定义表格列模板

         -->
        <el-table
        class= "list-table"
        :data= "articles"
        stripe
        size= 'small'
        style="width: 100%"
        v-loading= "loading">
            <el-table-column
                prop=""
                label="封面">
                <template slot-scope= "scope">
                    <!-- <img v-if= "scope.row.cover.images[0]" class="article-cover" :src= "scope.row.cover.images[0]" alt="">
                    <img v-else class="article-cover" src= "./no-cover.jpg" alt=""> -->
                        <el-image
                            style="width: 50px; height: 50px"
                            :src="scope.row.cover.images[0]"
                            fit= "cover" lazy>
                            <div slot="error" class="image-slot">
                                <img  class="article-cover" src= "./no-cover.jpg" alt=""> 
                            </div>
                        </el-image>

                    <!-- 下面这种情况是在运行期间动态改变处理的，而本地图片必须在打包的时候就存在 -->
                    <!-- <img class="article-cover" :src= "scope.row.cover.images[0] || './no-cover.jpg" alt=""> -->

                </template>
            </el-table-column>
            <el-table-column
                prop="title"
                label="标题">
            </el-table-column>
            <el-table-column
                label="状态">
                <!-- 如果需要在自定义模板中获取当前遍历项数据，那么就在template上 申明slot-scope="scope" -->
                <template slot-scope= "scope">
                     <el-tag :type= "articleStatus[scope.row.status].type">{{ articleStatus[scope.row.status].text }}</el-tag>
           <!--     <el-tag type="" v-else-if="scope.row.status === 1">待审核</el-tag>
                    <el-tag type="success" v-else-if="scope.row.status === 2">审核通过</el-tag>
                    <el-tag type="danger" v-else-if="scope.row.status === 3">审核失败</el-tag>
                    <el-tag type="info" v-else-if="scope.row.status === 4">已删除</el-tag> -->
                </template>
            </el-table-column>
            <el-table-column
                prop="pubdate"
                label="发布时间">
            </el-table-column>
            <el-table-column
                label="操作">
                <!-- 自定义表格列模板，则把需要自定义的内容放到 template内容里 -->
                <template slot-scope= "scope">
                    <!-- 编辑 -->
                    <el-button
                    size="mini"
                    icon="el-icon-edit"
                    circle
                    type="primary"
                    @click= "$router.push('/publish?id=' + scope.row.id.toString())">
                    </el-button>

                    <!-- 删除 -->
                    <el-button
                    size="mini"
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    @click= "onDeleteChange(scope.row.id)">
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 列表分页 total设定总数据的条数，默认十条每页计算总页码 
                page-size 每页显示条目个数 默认每页十条-->
        <el-pagination
        background
        layout="prev, pager, next"
        :total= "totalCount"
        @current-change= 'loadArticle'
        :page-size= "pageSize"
        :disabled = 'loading'
        :current-page.sync= "page">
        </el-pagination>  
    </el-card>


  </div>
</template>

<script>
import { getArticles,getArticlesChannels,deleteArticle} from '@/api/article'

export default {
  name:'ArticleIndex',
  components:{},
  data () {
    return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        articles: [],  //文字数据列表
        articleStatus: [
            {status: 0, text: '草稿',type:'warning'},
            {status: 1, text: '待审核',type:'' },
            {status: 2, text: '审核通过',type:'success' },
            {status: 3, text: '审核失败',type: 'danger'},
            {status: 4, text: '已删除',type: 'info'}

        ],
        totalCount: 0,
        pageSize: 10,   //每页大小
        status: null,   //查询文章的状态，不传就是全部
        channels:[],     //文章频道列表
        channelId: null, // 查询文章的频道
        rangeDate: null,    //筛选的日期范围
        loading: true,      //表格加载中
        page: 1     //当前页码
    }
  },
  // 生命周期函数
  created () {
      this.loadArticle()
      this.loadChannels()


  },
  // 方法函数
  methods: {
    loadArticle(page = 1){
        this.loading = true
        getArticles({
            page,
            per_page: this.pageSize,
            status: this.status,
            channel_id : this.channelId,
            begin_pubdate: this.rangeDate ? this.rangeDate[0] : null,      //开始日期
            end_pubdate: this.rangeDate ? this.rangeDate[1] : null      //截止日期



        })
            .then(res => {
                // console.log(res);
                const { results, total_count: totalCount} = res.data.data
                this.articles = results
                this.totalCount = totalCount

                // 关闭加载动画
                this.loading = false
               
            })

    },

    loadChannels(){
        getArticlesChannels()
            .then(res => {
                // console.log(res);
                this.channels = res.data.data.channels
            })
    },


    onDeleteChange(articleId) {
        this.$confirm('确认删除？, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            // 点击确认执行这里
            //找到数据接口 传入要删除的文字id
            deleteArticle(articleId.toString())
                .then(res =>{
                    console.log(res);
                    // 删除成功。更新文字列表
                    this.loadArticle(this.page)
                    this.totalCount--
                })

            // 封装请求方法

            // 删除请求调用

            // 处理响应结果

            this.$message({
                type: 'success',
                message: '删除成功'
            });
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消'
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
    .filter-card{
        margin-bottom: 30px;
    }

    .list-table{
        margin-bottom: 20px;
    }

    .article-cover{
        width: 50px;
        background-size: cover;
    }

</style>
