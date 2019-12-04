<template>
  <div>
    <x-header class="header" @on-click-back="backtoHome" :left-options="{backText: '首页',preventGoBack:true}">预置页面</x-header>
    <scroll>
      <!--预置表弹窗，电压以及表格编号-->
      <group title="设置预置表参数">
        <popup-picker title="电压" :data="voltages" v-model="voltage"></popup-picker>
        <popup-picker title="表格编号" :data="tablenumbers" v-model="tablenumber"></popup-picker>
        <x-button type="primary" @click.native="connectTarget">写设备参数</x-button>
      </group>
    </scroll>
  </div>
</template>

<script>
  import { XButton,XHeader,Group,PopupPicker} from 'vux'
  import Scroll from '../common/scroll/Scroll'
    export default {
        name: "Preset",
      components:{
        XButton,XHeader,Scroll,Group,PopupPicker
      },
      data(){
          return {
            voltages:[['HV']],
            voltage:['HV'],
            tablenumbers:[['C178']],
            tablenumber:['C178']
          }
      },
      methods:{
        backtoHome(){
          this.$router.push('/')
        }
      }
    }
</script>

<style scoped>
  .header{
    position: fixed;
    width: 100%;
    z-index: 1;
  }
</style>
