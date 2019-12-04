<template>
  <div id="updates">
    <x-header class="header" @on-click-back="backtoHome" :left-options="{backText: '首页',preventGoBack:true}">固件更新</x-header>
    <scroll>
      <!--目标设备选择弹窗-->
      <group title="选择设备进行更新">
        <popup-picker title="目标设备" :data="targets" v-model="target"></popup-picker>
        <x-button type="primary" @click.native="connectTarget">下载设备信息</x-button>
      </group>
      <!--输入框-->
      <group title="设备信息如下">
        <x-input title="主固件版本" required :value="mainVersion" text-align="right" label-width="200%"></x-input>
        <x-input title="父固件版本" required :value="subVersion" text-align="right" label-width="200%"></x-input>
        <x-input title="内存模块" required :value="flashBlock" text-align="right"></x-input>
        <x-button type="primary" @click.native="writeMessage">更新信息提交</x-button>
      </group>
      <!--更新按钮-->
      <group title="进行更新操作">
        <x-button type="primary" @click.native="startUpdate">开始更新</x-button>
      </group>
      <group title="更新日志:">
        <cell-form-preview :list="list"></cell-form-preview>
      </group>
      <!--更新进行中-->
      <div>
        <loading :show="showloading" text="updata"></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
  import { XButton,XHeader,Group,PopupPicker,XInput,CellFormPreview,Loading} from 'vux'
  import Scroll from '../common/scroll/Scroll'
    export default {
        name: "Updates",
      components:{
        XButton,XHeader,Scroll,Group,PopupPicker,XInput,CellFormPreview,Loading
      },
      data(){
        return {
          targets:[['BMS VIA BMU','BMU']],
          target:['BMS VIA BMU'],
          mainVersion: '',
          subVersion: '',
          flashBlock: '',
          showloading:false,
          list:[{
            label: '连接设备',
            value: '等待连接..'
          }, {
            label: '参数配置',
            value: '等待配置..'
          }, {
            label: '更新操作',
            value: '等待更新..'
          }]
        }
      },
      methods:{
          //返回首页
        backtoHome(){
          this.$router.push('/')
        },
        //连接设备
        connectTarget(){
          this.list[0].value="成功"
        },
        //填写更新信息
        writeMessage(){
          this.list[1].value="成功"
        },
        //开始更新
        startUpdate(){
          this.showloading=true
          setTimeout(() => {
            this.showloading=false
            this.list[2].value="成功"
          }, 2000)
        },
        downloadfile(){

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
