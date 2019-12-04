<template>
  <div id="app">
    <router-view style="padding-bottom: 50px"/>
    <tabbar style="position: fixed" v-show="tabbarShow" ref="tabbar">
      <tabbar-item link="/config" selected>
        <img slot="icon" src="./assets/img/tabbar/configuration2.png">
        <img slot="icon-active" src="./assets/img/tabbar/configuration1.png">
        <span slot="label">Config</span>
      </tabbar-item>
      <tabbar-item link="/updates">
        <img slot="icon" src="./assets/img/tabbar/firmware2.png">
        <img slot="icon-active" src="./assets/img/tabbar/firmware1.png">
        <span slot="label">Update</span>
      </tabbar-item>
      <tabbar-item link="/preset">
        <img slot="icon" src="./assets/img/tabbar/threshold2.png">
        <img slot="icon-active" src="./assets/img/tabbar/threshold1.png">
        <span slot="label">Preset</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>

  import { Tabbar, TabbarItem,ViewBox  } from 'vux'
export default {
  name: 'App',
  components:{
    Tabbar,
    TabbarItem,
    ViewBox
  },
  computed:{
    tabbarShow(){
      return this.$route.path==='/'?false:true
    }
  }
}
</script>

<style>
  @import "./assets/css/base.css";
</style>
