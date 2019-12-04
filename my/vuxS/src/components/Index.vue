<template>
  <div>
    <!--头部导航-->
    <x-header :right-options="{showMore: true}" @on-click-more="showMenus = true">with more menu</x-header>
    <!--底部弹框-->
    <div>
      <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu="changeLanguage"></actionsheet>
    </div>
    <!--中英文切换-->
    <p>{{$t('girl')}}</p>
    <p>{{$t('man')}}</p>
    <x-button @click.native="changeLang">中英文切换</x-button>
    <!--左侧文字，右侧文字-->
    <group>
      <selector title="选择1" direction="rtl" v-model="defaultkey" @on-change="change" :options="listkeyValue"></selector>
      <popup-picker title="选择2" :data="selectdata" v-model="value" @on-show="show" @on-hide="hide" @on-change="change" @on-shadow-change="shadowChange"></popup-picker>
    </group>
  </div>
</template>

<script>
  import { XHeader, Actionsheet,XButton,Group,Selector,PopupPicker } from 'vux'
    export default {
      name: "Index",
      components: {
        XHeader,
        Actionsheet,
        XButton,
        Group,
        Selector,
        PopupPicker
      },
      methods: {
        changeLang(){
          console.log(this.$i18n.locale)
          let lang=this.$i18n.locale==='zh-CN'?'en-US':'zh-CN'
          this.$i18n.locale=lang
        },
        changeLanguage(menuKey,menuItem) {
          console.log(this.$i18n.locale)
          switch (menuKey) {
            case 'chinese':
              this.$i18n.locale = 'zh-CN'
              console.log(menuKey,menuItem)
              break
            case 'english':
              this.$i18n.locale = 'en-US'
              console.log(menuKey,menuItem)
              break
          }
        },
        show(){
          console.log('弹框出现时')
        },
        hide(){
          console.log('弹框消失时')
        },
        change(val){
          console.log('值改变时触发',val)
        },
        shadowChange(ids,name){
          console.log('滑动时触发',ids,name)
        }
      },
      data () {
        return {
          menus: {
            chinese: '中文',
            english: 'English'
          },
          showMenus: false,
          defaultkey:'gd',
          listkeyValue: [{key: 'gd', value: '广东'}, {key: 'gx', value: '广西'}],
          selectdata:[['小米1', 'iPhone1', '华为1', '情怀1', '三星1', '其他1', '不告诉你1']],
          value:['小米1']
        }
      }
    }
</script>

<style lang="less">
</style>
