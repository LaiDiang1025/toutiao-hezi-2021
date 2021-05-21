<template>
  <div class='image-list'>
        <div style="padding-bottom:20px" class="action-head">
            <el-radio-group v-model="collect" size="mini" @change= "loadImage(1)">
                <el-radio-button :label="false">全部</el-radio-button>
                <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
            <el-button size="mini" type="success" round @click= "dialogUploadVisible = true" v-if="isShowAdd">上传素材</el-button>        
        </div>

        <!-- 素材列表 -->
        <el-row :gutter= "10"> 
            <el-col :span= "4" :xs= "12" :sm= "6" :md= "6" :lg= "4" v-for= "(img,index) in images" :key= "index" class="image-item" @click.native= "selected = index">
                <el-image style="height: 100px" :src= "img.url" fit= "cover"></el-image>
                <div class="selected" v-if = 'isShowSelected && selected === index'></div>
                <!-- 图片操作 -->
                <div class="image-action" v-if= "isShowAction">
                    <!-- 收藏按钮 -->
                    <el-button 
                    :icon= " img.is_collected ? 'el-icon-star-on' : 'el-icon-star-off' "
                    @click= "onCollect(img)"
                    circle
                    type="warning"
                    size="mini"
                    :loading= 'img.loading'
                    ></el-button>
                    <!-- 删除 -->
                    <el-button icon="el-icon-delete" circle size="mini" type="danger" @click= "onDelete(img)" :loading= 'img.loading'></el-button>
                </div>
            </el-col>
        </el-row>


        <!-- 数据分页 -->
        <!-- 分页数据改变以后，页码不会改变
            如果需要单独处理，高亮的页面
         -->
        <el-pagination
            background
            layout="prev, pager, next"
            :total= "totalCount"
            :page-size= "pageSize"
            style="margin-top:5px"
            :current-page.sync= 'page'
            @current-change= 'onPageChange'>
        </el-pagination>

        <el-dialog title="上传素材" :visible.sync= "dialogUploadVisible" :append-to-body='true' width="200">
        <!-- upload组件本身就支持请求提交上传操作，不要直接发请求，会自己发 -->
        <!-- 请求方法：默认就是POST
            请求路径(action): 必须写完整路径
            请求头(headers):

         -->
            <el-upload
                class="upload-demo"
                drag
                action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
                multiple
                :headers= "uploadHeaders"
                name= "image"
                :show-file-list= 'false'
                :on-success= 'onUploadSuccess'>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-dialog>

  </div>
</template>

<script>
import { getImages,collectImage,deleteImage } from '@/api/image'
export default {
  name:'ImageList',
  components:{},
  props:{
    //   是否显示添加素材
      isShowAdd:{
          type: Boolean,    //布尔值
          default: true     //默认值

      },
    //   是否显示图片下方的操作
      isShowAction:{
          type: Boolean,
          default: true
      },

      isShowSelected:{
          type: Boolean,
          default: false
      }
  },
  data () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
        collect: false,
        images: [],  // 图片素材列表
        dialogUploadVisible: false, //上传素材弹出层
        uploadHeaders:{
            Authorization: `Bearer ${user.token}`

        },
        totalCount: 0,  //总数据条数
        pageSize: 12,    //每页大小
        page: 1,     //当前页码
        selected: null  //选择的索引

    }
  },
  // 生命周期函数
  created () {
    //   页面初始化，加载第一页数据
      this.loadImage()
  },
  // 方法函数
  methods: {
      loadImage(page = 1){
          //重置高亮页码，防止数据和页码不对应
          this.page = page
          getImages({
              collect: this.collect,
              page,
              per_page: this.pageSize
          }).then(res =>{
            //   console.log(res.data);
            const results = res.data.data.results
            results.forEach(img =>{
                // img对象本来没有这个数据，手动添加了该数据，为了控制每个收藏按钮的loading状态
                img.loading = false
            })
            this.images = results
            this.totalCount = res.data.data.total_count

          })
      },

      onUploadSuccess(){
          //关闭对话框
          this.dialogUploadVisible = false
          //更新素材列表
          this.loadImage(this.page)

          this.$message({
              type:'success',
              message: '上传成功'
          })
      },

      onPageChange(page){
          console.log(page);
        this.loadImage(page)
      },

      onCollect(img){
        // 展示loading
        img.loading = true
        //如果已收藏，取消收藏，没有收藏就添加收藏
        //   console.log(img);
        collectImage(img.id,!img.is_collected)
            .then(res =>{
                // console.log(res);
                img.is_collected = !img.is_collected
                // 关闭loading
                img.loading = false
            })
        //     if(img.is_collected){
        //         collectImage(img.id,false)

        //     }else{
        //         collectImage(img.id,true)
        //     }


      },

      onDelete (img) {
          deleteImage(img.id)
            .then(res =>{
                this.loading = true
                this.loadImage(this.page)
                this.loading = false
                this.$message({
                    type:'success',
                    message:'删除成功'
                })
            })

      }
  },
  // 计算属性
  computed: {
  }
}
</script>

<style lang='less' scoped>
    .action-head{
        padding-bottom: 20px;
        display: flex;
        justify-content: space-between;
    }

    .image-item {
        position: relative;
    }

    .image-action{
        height: 40px;
        background: rgba(204, 204, 204, .5);
        position: absolute;
        bottom: 4px;
        left: 5px;
        right: 5px;
        font-size: 20px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        color: #ffff;
     }

     .el-icon-star-on{
         color:pink;
     }

     .selected{
         background:url('./下载.png') no-repeat;
         background-size: cover;
         position: absolute;
         left: 0;
         right: 0;
         top: -5px;
         bottom: 0;
         display: flex;
         justify-content: center;
         align-items: center;
     }


</style>
