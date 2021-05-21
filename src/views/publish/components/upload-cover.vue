<template>
  <div class='upload-cover' @click= "showCoverSelect">
      <div class="cover-wrap">
          <img class="cover-image" ref="cover-image" :src= "value">
      </div>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            :append-to-body = true
        >
            <el-tabs v-model="activeName" type="card" @tab-click= "handleClick">
                <!-- 素材库选择图片 -->
                <el-tab-pane label="素材库" name="first">
                    <!-- ref有两个作用
                        1.作用到普通HTML 标签上可以获取DOM
                        2.作用到组件上可以获取组件
                     -->
                    <ImageList :isShowAdd='false' :isShowAction='false' ref="image-list" :isShowSelected='true'></ImageList>
                </el-tab-pane>

                <!-- 手动上传图片 -->
                <el-tab-pane label="上传图片" name="second">
                    <input type="file" @change= "onFileChange" ref="file">
                    <img width="100" alt="" ref="preview-image">
                </el-tab-pane>
            </el-tabs>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click= "onCoverConfirm">确 定</el-button>
            </span>        
        </el-dialog>  
    </div>
</template>

<script>
import { uploadImage } from '@/api/image'
import ImageList from '@/views/image/components/image-list'
export default {
  name:'UploadCover',
  components:{
      ImageList
  },
  props:['value'],
  data () {
    return {
        dialogVisible:false, //控制弹出层的状态
        activeName: 'first' //默认选中的tab页
    }
  },
  // 生命周期函数
  created () {
  },
  // 方法函数
  methods: {
      showCoverSelect(){
          this.dialogVisible = true
      },

      onFileChange(){
        //   console.log('file change');
        const file = this.$refs.file.files[0]

        // 图片预览
        const blob = window.URL.createObjectURL(file)

        this.$refs['preview-image'].src = blob

        // 防止用户选择同一个文件不触发change事件
        //   this.$refs.file.value = ''
      },

      onCoverConfirm(){
        //   如果tab是上传图片，并且input-file有选择的文件，才执行上传文件的操作
        if(this.activeName === 'second'){
            const file = this.$refs.file.files[0]
            if(!file){
                this.$message({
                    type:'warning',
                    message: '请选择图片'
                })
                return
            }

            //执行上传文件的操作
            const fd  = new FormData()
            fd.append('image',file)
            uploadImage(fd).then(res =>{
                // console.log(res);
                // 关闭弹出层
                this.dialogVisible = false
                // 展示上传的图片
                this.$refs['cover-image'].src = res.data.data.url

                // 将图片地址发送给父组件
                this.$emit('input',res.data.data.url);

            })

        }else if(this.activeName === 'first'){
            // 还有一种组件通信方式，父组件可以直接访问子组件中的数据
            const imageList = this.$refs['image-list']
            const selected = imageList.selected
            if(selected === null){
                this.$message('请选择文章封面')
                return
            }

            // 关闭对话框
            this.dialogVisible = false

            // 修改父组件绑定数据
            this.$emit('input',imageList.images[selected].url)


        }
      },

      handleClick(tab, event) {
        // console.log(tab, event);
      }
  },
  // 计算属性
  computed: {
  }
}
</script>

<style lang='less' scoped>
.cover-wrap{
    width: 120px;
    height: 100px;
    border: 1px solid #000;
    .cover-image{
        height: 100px;
        max-width: 100%;
        float: left;
    }
}

</style>
