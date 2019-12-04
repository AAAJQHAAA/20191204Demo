<template>
    <div id="test">
      <div class="top">

      </div>
      <div class="wrapper" ref="wrapScroll">
        <div class="content">
          <div style="background-color: #e6a23c">111111111111</div>
          <div style="background-color: #5daf34">2222222222222</div>
          <div style="background-color: black">3333333333333</div>
          <div style="background-color: #5daf34">444444444444444</div>
          <div style="background-color: palevioletred">555555555555555</div>
        </div>
      </div>
      <div class="bottom">

      </div>
    </div>
</template>

<script>
  import BScroll from "better-scroll"
    export default {
      name: "TestScroll",
      data() {
        return {
          wrapScroll: {} //滚动容器对象
        }
      },
      methods:{
        //初始化滚动
        initScroll() {
          this.wrapScroll = new BScroll(this.$refs.wrapScroll);
        }
      },
      created() {
        //渲染dom后初始化滚动
        this.$nextTick(() => {
          this.initScroll();
        });
      }
    }
</script>

<style scoped>

.top{
  height: 200px;
  background-color: palevioletred;
}
.bottom{
  height: 200px;
  background-color: black;
}
.wrapper{
  height: 300px;
  background-color: #3a8ee6;
  overflow: hidden;
}
.content div{
  height: 300px;
  width: 60%;
}
</style>
