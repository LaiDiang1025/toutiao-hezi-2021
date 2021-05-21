<template>
  <div class='bmap' id="container">
      无敌

  </div>
</template>

<script>
export default {
  name:'BampDemo',
  components:{},
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
  mounted(){
      var map = new window.BMap.Map("container")
      var point = new window.BMap.Point(116.404, 39.915)
      map.centerAndZoom(point, 15)

  },
  // 计算属性
  computed: {
  }
}
</script>

<style lang='less' scoped>
    .bmap{
        width: 600px;
        height: 400px;
        border: 1px solid #000;
    }

</style>
