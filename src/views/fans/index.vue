<template>
  <div class='fans-container'>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>粉丝管理</el-breadcrumb-item>
            </el-breadcrumb>        
        </div>

        <div>
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <!-- 粉丝列表 -->
                <el-tab-pane label="粉丝列表" name="first">
                    <!-- 素材列表 -->
                    <el-row :gutter= "10"> 
                        <el-col :span= "4" :xs= "12" :sm= "6" :md= "6" :lg= "4" v-for= "(fan,index) in fans" :key= "index" class="fans-list">
                            <div class="fans-item">
                                <el-image style="weight: 100px" :src= 'fan.photo' fit= "cover" class="fans-image"></el-image>
                                <p>{{fan.name}}</p>
                                <el-button size="mini">关注</el-button>
                            </div>
                        </el-col>
                    </el-row>
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :total= "totalCount">
                    </el-pagination>
                </el-tab-pane>

                <!-- 粉丝画像 -->
                <el-tab-pane label="粉丝画像" name="second">
                    <div ref="main" style="width: 600px;height:400px;">

                    </div>

                    <h2>echarts集合百度地图实例</h2>
                    <MapDemo></MapDemo>

                    <h2>百度地图实例</h2>
                    <BmapDemo></BmapDemo>




                </el-tab-pane>
            </el-tabs>    
        </div>
    </el-card>
  </div>
</template>

<script>
import { uploadFans } from '@/api/fans'
import echarts from 'echarts'
import MapDemo from './components/map-demo'
import BmapDemo from './components/bmap-demo' 

export default {
  name:'FansIndex',
  components:{
      MapDemo,
      BmapDemo
  },
  data () {
    return {
        activeName: 'first',
        fans:[],
        totalCount:0,
    }
  },
  // 生命周期函数
  created () {
      this.uploadFansList()
  },
  // 方法函数
  methods: {
      uploadFansList(){
           uploadFans().then(res =>{
            // console.log(res);
            this.fans = res.data.data.results
            this.totalCount = res.data.data.total_count
           })
      },
      handleClick(tab, event) {
        // console.log(tab, event);
      }
  },

  mounted() {
      //初始化操作 DOM 一定要写到mounted 钩子函数中
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(this.$refs.main)

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        }

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);


  },
  // 计算属性
  computed: {
  }
}
</script>

<style lang='less' scoped>
    .fans-item{
        width: 100px;
        height: 150px;
        border: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: center;
        padding: 5px 0;
        .fans-image{
            height: 100px;
        }
    }

</style>
