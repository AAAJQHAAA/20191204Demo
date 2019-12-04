<template>
  <div id="home">
    <!--头部导航-->
    <x-header :left-options="{showBack: false}">{{$t('home.headerTitle')}}</x-header>
    <group>
      <popup-picker :title="$t('home.popuptitle1')" :data="langs" v-model="langvalue" @on-hide="hide"></popup-picker>
      <popup-picker :title="$t('home.popuptitle2')" :data="machines" v-model="machinevalue"></popup-picker>
    </group>
    <x-button type="primary" link="/config">{{$t('home.buttonValue')}}</x-button>
    <button @click="connect">socket连接</button>
    <button @click="sendmessage">发送数据</button>
    <x-button type="primary" @click.native="downLoadFile">下载</x-button>
    <x-button type="primary" @click.native="parseBinFile">获取文件</x-button>
    <div>
      <h5>fileUrl:{{fileUrl}}</h5>
      <h5>data:{{data}}</h5>
    </div>
  </div>
</template>

<script>
  import { XButton,Actionsheet,XHeader,Group,PopupPicker} from 'vux'
  import crc from '@/common/CRC'
  export default {
    name: "Home",
    components: {
      XButton,
      Actionsheet,
      XHeader,
      Group,
      PopupPicker
    },
    data() {
      return {
        langvalue: this.$t('home.langvalue'),
        machinevalue: this.$t('home.machinevalue'),
        socket: '',
        fileUrl:'',
        data:''
      }
    },
    methods: {
      hide() {
        let lang = this.langvalue[0]
        switch (lang) {
          case '中文':
          case 'Chinese':
            this.$i18n.locale = 'zh-CN'
            break
          case '英语':
          case 'English':
            this.$i18n.locale = 'en-US'
            break
        }
      },
      connect() {
        alert('开始连接')
        var socket = new Socket();
        socket.open(
          "192.168.16.254",
          8080,
          function () {
            // invoked after successful opening of socket
            alert('连接成功')
          },
          function (errorMessage) {
            // invoked after unsuccessful opening of socket
            alert('连接失败')
          })
        socket.onData = (data) => {
          alert(data)
        }
        this.socket = socket
      },
      sendmessage() {
        var data = []
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
        // console.log(crc.ToCRC16(data))
        // console.log(crc.ToCRC16(data).substring(0,2))
        // console.log(crc.ToCRC16(data).substring(2))
        // var crcStr=crc.ToCRC16(data)
        // data.push(parseInt(crcStr.substring(0,2),16))
        // data.push(parseInt(crcStr.substring(2),16))
        this.socket.write(data,
          function () {
            alert('发送成功')
          },
          function (errorMessage) {
            alert('发送失败')
          });
      },
      downLoadFile() {
        var uri = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575376466063&di=f4c74cf5ba2e5ed211ffed80f08a0e67&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201208%2F30%2F20120830173930_PBfJE.jpeg";
        var fileURL = cordova.file.externalRootDirectory + 'tmp.jpeg';
        alert(fileURL)
        var me = this;
        let fileTransfer = new FileTransfer();
        fileTransfer.download(
          uri, fileURL, function (entry) {
            me.fileUrl=entry.toURL()
            alert('download complete: ' + entry.toURL())
          },
          function (error) {
            alert('download error: ' + error.source + error.target + error.code)
          },
          false, {
            headers: {
              'Authorization': 'Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=='
            }
          }
        )
      },
      parseBinFile(){
        let me=this
        window.requestFileSystem(LocalFileSystem.PERSISTENT,0, function (fs) {
          alert('fs'+JSON.stringify(fs))
          alert('fs的root'+JSON.stringify(fs.root))
          fs.root.getFile('tmp.jpeg', {
            create: false,
            exclusive: false
          }, function (fileEntity) {
            alert('文件地址：' + JSON.stringify(fileEntity));
            fileEntity.file(function (file){
              alert('文件：'+JSON.stringify(file))
              me.getBin(file)
            },function (error){
              alert('文件错误：'+JSON.stringify(error))
            });
          },function (error){
            alert('错误：'+JSON.stringify(error))
          });
        });
      },
      getBin(file) {
        let _this=this
        alert('开始解析文件'+JSON.stringify(file))
        if (window.FileReader) {
          alert('里面开始解析文件')
          let reader = new FileReader()
          alert('reader对象'+JSON.stringify(reader))
          reader.readAsArrayBuffer(file);//发起异步请求
          reader.onload = function (e) {
            alert('解析完成'+JSON.stringify(e))
            //读取完成后，数据保存在对象的result属性中
            let result = new Int8Array(e.target.result)
            alert('解析完成'+result[0])
            let data = []
            for (let i of result) {
              let num16 = i.toString(16)
              switch (num16.length) {
                case 1:
                case 2:
                  data.push(parseInt(num16, 16))
                  data.push(0)
                  break
                case 3:
                  data.push(parseInt(num16.substring(1), 16))
                  data.push(parseInt(num16.substring(0, 1), 16))
                  break
                case 4:
                  data.push(parseInt(num16.substring(2), 16))
                  data.push(parseInt(num16.substring(0, 2), 16))
                  break
              }
            }
            _this.data = data
            alert(data)
          }
        } else {
          alert('解析文件，不支持')
        }
      }
    },
    computed: {
      langs() {
        this.langvalue = this.$t('home.langvalue')
        return this.$t('home.langs')
      },
      machines() {
        this.machinevalue = this.$t('home.machinevalue')
        return this.$t('home.machines')
      }
    },
    mounted() {
      let _this=this
      document.addEventListener("deviceready", function () {
        // 现在可以安全的使用设备API
        console.log('Device is Ready!')
        _this.connect()
      }, false)
    }
  }
</script>

<style scoped>

</style>
