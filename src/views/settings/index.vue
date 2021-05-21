<template>
  <div class='settings-container'>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
            <!-- 面包屑路径导航 -->
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>个人设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        
        <el-row>
            <el-col :span="16">
                <el-form ref="user-info-form" :model="user" :rules= "rules" label-width="80px">
                    <el-form-item label="编号">
                        {{user.id}}
                    </el-form-item>
                    <el-form-item label="手机">
                        {{user.mobile}}
                    </el-form-item>
                    <el-form-item label="媒体名称" prop="name">
                        <el-input v-model="user.name"></el-input>
                    </el-form-item>
                    <el-form-item label="媒体介绍" prop="intro">
                        <el-input type="textarea" v-model="user.intro"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="user.email"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onUpdateUser" :loading= 'updateProFileLoading'>保存</el-button>
                    </el-form-item>
                </el-form>
            </el-col>

            <el-col :offset="2" :span="4">
                <!-- <p @click= "$refs.file.click()">点击修改头像</p> -->
                <label for="file">
                    <el-avatar shape="square" :size="150" fit= "cover" :src= "user.photo">
                    </el-avatar>
                    <p>点击修改头像</p>
                </label>
                <input id="file" type="file" ref="file" @change= "onFileChange"  hidden>
            </el-col>
        </el-row>

      </el-card>

      <el-dialog
        title="修改头像"
        :visible.sync="dialogVisible"
        :append-to-body= 'true'
        @opened= 'onDialogOpened'
        @closed= 'onDialogClosed'>
        <div class="preview-image-wrap">
            <img class="preview-image" :src= "previewImage" ref="preview-image">
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click= "onUpdatePhoto" :loading= 'updatePhotoLoading'>确 定</el-button>
        </span>
      </el-dialog>

    </div>
</template>

<script>
import { getUserProfile,updateUserPhoto,updateUserProFile } from '@/api/user'

import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import globalBus from '@/utils/global-bus'



export default {
  name:'SettingsIndex',
  components:{},
  data () {
    return {
        user:{ //用户资料
            email:'',
            id: null,
            intro:'',
            mobile: '',
            name:'',
            photo:''

        },  
        dialogVisible: false, //控制上传图片裁切预览的显示状态，默认是false  
        previewImage: '',    //  预览图片
        cropper: null,   //裁切器实例
        updatePhotoLoading: false,   //更新用户头像loading 状态
        updateProFileLoading: false, //更新用户基本信息的loading状态
        rules:{
            name:[
                {required:true,message:'请输入媒体名称',trigger:'change'},
                {min:1,max:7,message:'长度在1到7个字符',trigger:'change'}
            ],
            intro:[
                {required:true,message:'请输入媒体介绍',trigger:'change'}
            ],
            email:[
                {required:true,message:'请输入邮箱',trigger:'change'},
                {pattern:/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,message:'请输入正确的邮箱格式',trigger:'change'}
            ]
        }
    }
  },
  // 生命周期函数
  created () {
      this.loadUser()
  },
  // 方法函数
  methods: {
      loadUser(){
          getUserProfile()
            .then(res =>{
                // console.log(res);
                this.user = res.data.data
            })
      },
      onFileChange(){
        // console.log('ok');
        // 处理图片
        const file = this.$refs.file

        const blobData = window.URL.createObjectURL(file.files[0])

        this.previewImage = blobData
        
        // 展示弹出层，预览选择的图片
        this.dialogVisible = true


        //解决选择相同文件不触发change事件问题
        this.$refs.file.value = ''

      },

      onDialogOpened(){
    //     图片裁切器必须基于 img 进行初始化 
    // 注意：img必要是可见状态才能初始化  因为我们这里要在对话框里面初始化 所以务必要在对话框完全打开的状态进行初始化
    //     获取图片Dom节点
        const image = this.$refs['preview-image']

        // 第一次初始化完之后，如果预览裁切的图片发生了变化，裁切器默认不会更新
        // 如果需要预览图片发生变化需要更新裁切器
            // 方法一：裁切器.replace()方法
            // 方法二：销毁裁切器，重新初始化
        // 初始化裁切器
        this.cropper = new Cropper(image, {
        aspectRatio: 4/3,
        viewMode:1,
        dragMode: 'none',
        background: false,


        // 当年移动裁切器的时候会 触发调用crop方法
        crop(event) {
            // console.log(event.detail.x);
            // console.log(event.detail.y);
            // console.log(event.detail.width);
            // console.log(event.detail.height);
            // console.log(event.detail.rotate);
            // console.log(event.detail.scaleX);
            // console.log(event.detail.scaleY);
        }
        });

    },

    onDialogClosed(){
        // 对话框关闭，销毁裁切器
        this.cropper.destroy()

    },

    onUpdatePhoto(){
        // 让确定按钮开始loading
        this.updatePhotoLoading = true
        //获取裁切的图片对象
        this.cropper.getCroppedCanvas().toBlob((file) => {
            // console.log(file);
            const fd = new FormData()
            fd.append('photo',file)
            // 请求提交fd
            // 请求更新用户头像
            updateUserPhoto(fd).then(res =>{
                // console.log(res);
                // 关闭对话框
                this.dialogVisible = false
                // 更新视图的展示

                // 直接把裁切结果的文件对象转为 blob数据本地预览
                this.user.photo = window.URL.createObjectURL(file)

                // 关闭确定按钮的loading
                this.updatePhotoLoading = false

                this.$message({
                    type:'success',
                    message:'更新头像成功'
                })


                // 把服务端返回的图片进行展示有点慢
                // this.user.photo = res.data.data.photo
            })

        })
    },

    onUpdateUser(){
        this.updateProFileLoading = true
        // console.log('保存');
        // 表单验证
        // 验证通过，提交表单
        this.$refs['user-info-form'].validate((valid) => {
            if (valid) {
                updateUserProFile(this.user)
                    .then(res =>{
                        // console.log(res);
                        this.updateProFileLoading = false
                        this.$message({
                            type:'success',
                            message:'修改成功'
                        })

                        // 发布通知,用户信息已修改
                        globalBus.$emit('update-user',this.user)
                    })
            }
        })
    }

  },
  // 计算属性
  computed: {
  }
}
</script>

<style lang='less' scoped>
    .preview-image-wrap{
        .preview-image{
            display: block;
            max-width: 100%;
        }

    }
</style>

