<template>
  <div>
    <x-header class="header" @on-click-back="backtoHome" :left-options="{backText: '首页',preventGoBack:true}">配置页面</x-header>
    <scroll>
      <!--配置流程-->
      <flow ref="flow">
        <flow-state state="1" title="时间配置" is-done></flow-state>
        <flow-line :is-done="firstline"></flow-line>

        <flow-state state="2" :is-done="secondstate" title="逆变器配置"></flow-state>
        <flow-line :is-done="secondline"></flow-line>

        <flow-state state="3" :is-done="thirdstate" title="系统配置"></flow-state>
        <flow-line :is-done="thirdline"></flow-line>

        <flow-state state="4" :is-done="fourstate" title="格子配置"></flow-state>
      </flow>
      <!--下一步和上一步按钮-->
      <flexbox>
        <flexbox-item>
          <x-button type="primary" @click.native="back">上一步</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button type="primary" @click.native="next">下一步</x-button>
        </flexbox-item>
      </flexbox>
      <!--第一步时间选择-->
      <group title="时间选择" v-show="currentstart===1">
        <datetime title="时间" v-model="time" format="YYYY-MM-DD HH:mm"></datetime>
        <x-button type="primary" @click.native="connect">连接</x-button>
        <x-button type="primary" @click.native="sendmessage">提交测试</x-button>
        <x-button type="primary" @click.native="submitTime">提交时间</x-button>
      </group>
      <!--第二步逆变器设置-->
      <group title="逆变器设置" v-show="currentstart===2">
        <popup-picker title="逆变器设置" :data="inverters" v-model="inverter"></popup-picker>
      </group>
      <!--第三步系统配置-->
      <group title="HV系统配置" v-show="currentstart===3&&inverter[0].substring(inverter[0].length-2)==='HV'">
        <x-input title="Model Serious" required v-model="modelSerious" text-align="right" placeholder="please input" :is-type="inrange" :max="1"></x-input>
        <popup-picker title="Cell Type" :data="cellTypes" v-model="cellType"></popup-picker>
      </group>
      <group title="LV系统配置" v-show="currentstart===3&&inverter[0].substring(inverter[0].length-2)==='LV'">
        <x-input title="Parallels" required v-model="parallels" text-align="right" placeholder="please input" :is-type="inrange46" :max="2"></x-input>
        <popup-picker title="BMS Type" :data="bmsTypes" v-model="bmsType"></popup-picker>
      </group>
      <!--第四步格子设置-->
      <group title="格子设置" v-show="currentstart===4">
        <popup-picker title="Grid" :data="grids" v-model="grid"></popup-picker>
        <popup-picker title="Phase" :data="phases" v-model="phase"></popup-picker>
      </group>
      <!--提交配置-->
      <group title="提交配置" v-show="currentstart===4">
        <x-button type="primary" @click.native="testAll">测试提交</x-button>
        <x-button type="primary" @click.native="submitAll">提交</x-button>
      </group>
    </scroll>
  </div>
</template>

<script>
  import { XButton,XHeader,Flow, FlowState, FlowLine,Group,Flexbox,FlexboxItem,Datetime,PopupPicker,XInput} from 'vux'
  import Scroll from '../common/scroll/Scroll'
  import commonMethods from '../../common/common'
  import crc from '../../common/CRC'
    export default {
        name: "Config",
      components:{
        XButton,XHeader,Scroll,Flow, FlowState, FlowLine,Group,Flexbox,FlexboxItem,Datetime,PopupPicker,XInput
      },
      data(){
        return {
          currentstart:1,
          firstline:false,
          secondstate:false,
          secondline:false,
          thirdstate:false,
          thirdline:false,
          fourstate:false,
          time:commonMethods.Format(new Date(),'yyyy-MM-dd hh:mm'),
          inverters:[['Fronius HV','GOODWE HV','GOODWE LV','KOSTAL HV','Selectron LV','SMA HV','SMA LV','Victron LV']],
          inverter:[],
          modelSerious:'',
          inrange:function (value) {
            return {
              valid: parseInt(value)>=4&&parseInt(value)<=8,
              msg: '必须>=4、<=8'
            }
          },
          cellTypes: [['C17B','C17S','C20U']],
          cellType: [],
          parallels:'',
          inrange46:function (value) {
            return {
              valid: parseInt(value)<=46,
              msg: '必须<=46'
            }
          },
          bmsTypes:[['Premium HVS','Premium HVM','Premium HVH']],
          bmsType:[],
          grids: [['Off-grid','On-grid','Backup']],
          grid: [],
          phases: [['Single','Three']],
          phase: [],
          socket:''
        }
      },
      methods:{
        backtoHome(){
          this.$router.push('/')
        },
        back(){
          switch (this.currentstart) {
            case 1:
              break;
            case 2:
              this.firstline=false
              this.secondstate=false
              this.currentstart--
              break;
            case 3:
              this.secondline=false
              this.thirdstate=false
              this.currentstart--
              break;
            case 4:
              this.thirdline=false
              this.fourstate=false
              this.currentstart--
              break;
          }
        },
        next(){
          switch (this.currentstart) {
            case 1:
              this.firstline=true
              this.secondstate=true
              this.currentstart++
              break;
            case 2:
              if(this.inverter!=''){
                this.secondline=true
                this.thirdstate=true
                this.currentstart++
              }else{
                alert('请选择')
              }
              break;
            case 3:
              if((this.modelSerious!=''&&this.cellType!='')||(this.parallels!=''&&this.bmsType!='')){
                this.thirdline = true
                this.fourstate = true
                this.currentstart++
              }else{
                alert('请填写完整')
              }
              break;
            case 4:
              break;
          }
        },
        connect(){
          alert('开始连接')
          var socket= new Socket();
          socket.open(
            "192.168.16.254",
            8080,
            function() {
              // invoked after successful opening of socket
              alert('连接成功')
            },
            function(errorMessage) {
              // invoked after unsuccessful opening of socket
              alert('连接失败')
            })
          socket.onData=(data)=>{
            alert(data)
          }
          this.socket=socket
        },
        sendmessage(){
          var data =[]
          data.push(0x01)
          data.push(0x10)
          data.push(0x00)
          data.push(0x63)
          data.push(0x00)
          data.push(0x03)
          data.push(0x06)
          //日期（十进制）
          data.push(0x13)
          data.push(0x09)
          data.push(0x15)
          data.push(0x09)
          data.push(0x12)
          data.push(0x00)
          //效验码（十进制）
          data.push(0x13)
          data.push(0x3D)
          this.socket.write(data,
            function() {
              alert('发送成功')
            },
            function(errorMessage) {
              alert('发送失败')
            });
        },
        submitTime(){
          alert('提交时间')
          var dateStr = this.time.replace(/-/g,'/')
          var date=new Date(dateStr)
          var data =[]
          data.push(0x01)
          data.push(0x10)
          data.push(0x00)
          data.push(0x63)
          data.push(0x00)
          data.push(0x03)
          data.push(0x06)
          //日期（十进制）
          var yearStr=date.getFullYear().toString()
          data.push(parseInt(yearStr.substring(yearStr.length-2)))
          data.push(date.getMonth()+1)
          data.push(date.getDate())
          data.push(date.getHours())
          data.push(date.getMinutes())
          data.push(date.getSeconds())
          //效验码（十进制）
          var crcStr=crc.ToCRC16(data)
          data.push(parseInt(crcStr.substring(0,2),16))
          data.push(parseInt(crcStr.substring(2),16))
          this.socket.write(data,
            function() {
              alert('发送成功')
            },
            function(errorMessage) {
              alert('发送失败')
            });
        },
        testAll(){
          //01 10 00 10 00 03 06 06 02 01 00 00 00 9F 4F
          var data =[]
          data.push(0x01)
          data.push(0x10)
          data.push(0x00)
          data.push(0x10)
          data.push(0x00)
          data.push(0x03)
          data.push(0x06)
          //配置（十进制）测试
          data.push(0x06)
          data.push(0x02)
          data.push(0x01)
          data.push(0x00)
          data.push(0x00)
          data.push(0x00)
          //效验码（十进制）
          data.push(0x9F)
          data.push(0x4F)
          this.socket.write(data,
            function() {
              alert('发送成功')
            },
            function(errorMessage) {
              alert('发送失败')
            });
        },
        submitAll(){
          console.log(this.inverters)
          console.log(this.inverter)
          console.log(commonMethods.getArrayIndex(this.inverters[0],this.inverter[0]))
          console.log('HV系统参数')
          console.log(this.modelSerious)
          console.log(this.cellTypes)
          console.log(this.cellType)
          console.log(commonMethods.getArrayIndex(this.cellTypes[0],this.cellType[0]))
          console.log('LV系统参数')
          console.log(this.parallels)
          console.log(this.bmsTypes)
          console.log(this.bmsType)
          console.log(commonMethods.getArrayIndex(this.bmsTypes[0],this.bmsType[0]))
          console.log(this.grids)
          console.log(this.grid)
          console.log(commonMethods.getArrayIndex(this.grids[0],this.grid[0]))
          console.log(this.phases)
          console.log(this.phase)
          console.log(commonMethods.getArrayIndex(this.phases[0],this.phase[0]))
          //01 10 00 10 00 03 06 06 02 01 00 00 00 9F 4F
          var data =[]
          data.push(0x01)
          data.push(0x10)
          data.push(0x00)
          data.push(0x10)
          data.push(0x00)
          data.push(0x03)
          data.push(0x06)
          //配置
          let ab0=commonMethods.getArrayIndex(this.inverters[0],this.inverter[0])
          let a1=parseInt(this.modelSerious)
          let a2=commonMethods.getArrayIndex(this.cellTypes[0],this.cellType[0])
          let b1=parseInt(this.parallels)
          let b2=commonMethods.getArrayIndex(this.bmsTypes[0],this.bmsType[0])
          let ab1=commonMethods.getArrayIndex(this.grids[0],this.grid[0])
          let ab2=commonMethods.getArrayIndex(this.phases[0],this.phase[0])
          data.push(ab0)
          if(this.inverter[0].substring(this.inverter[0].length-2)==='HV'){
            data.push(a1)
            data.push(a2)
          }else{
            data.push(b1)
            data.push(b2)
          }
          data.push(ab1)
          data.push(ab2)
          data.push(0x00)//最后一位默认为0
          //效验码（十进制）
          var crcStr=crc.ToCRC16(data)
          data.push(parseInt(crcStr.substring(0,2),16))
          data.push(parseInt(crcStr.substring(2),16))
          this.socket.write(data,
            function() {
              alert('发送成功')
            },
            function(errorMessage) {
              alert('发送失败')
            });
        }
      },
      mounted() {
        document.addEventListener("deviceready", function () {
          // 现在可以安全的使用设备API
          console.log('Device is Ready!')
          this.connect()
        }, false)
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
