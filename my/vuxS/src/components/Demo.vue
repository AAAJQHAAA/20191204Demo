<template>
  <div>
    <input type="text" label="当前消息:" v-model="msg" placeholder="请输入用户名" />
    <group>

     <!-- <van-button type="info" @click.native="sendms()">发送消息</van-button>-->
      <x-button type="primary" @click.native="sendms">发送消息</x-button>
     <!-- <van-button type="info" @click="uploadfile()">上传文件至服务器</van-button>
      <van-button type="info" @click.native="go()">跳转到模板页</van-button>-->
    </group>
  </div>
  <!--<div class="page has-navbar" v-nav="{ title: 'Home' }">
    <div class="page-content text-center">
      <div class="item item-divider">
        当前消息: {{msg}}
      </div>
      <von-input type="text" v-model="msg" label="输入发送内容"></von-input>
      <md-button class="button button-positive" @click.native="sendms()">
        发送消息
      </md-button>
      <md-button class="button button-positive" @click.native="uploadfile()">
        固件上传
      </md-button>

      <router-link class="button button-assertive" to="/about">
        <i class="ion-information-circled"></i> About
      </router-link>
    </div>
  </div>-->
</template>
<script>
    import { Group, XButton } from 'vux'
    export default {
        components: {
            Group,
            XButton
        },
        data () {
            return {
                socketObj: null,
                fileTranObj:null,
                msg:'cordova not init',
                tasksStr: [0x01,0x03,0x00,0x00,0x00,0x0C,0x45,0xCF]
            }
        },
        methods:{
            go(){
                this.$router.push({path:'/template'})
            },
            sendms(){
                var data = [0x01,0x03,0x00,0x00,0x00,0x0C,0x45,0xCF];
                var sendData = new Int16Array(data.length);
                for (var i = 0; i < data.length; i++) {
                    sendData[i] = data[i];
                }
                try{
                    var me = this;
                    this.socketObj.write(data);
                    this.socketObj.shutdownWrite();
                    this.socketObj.open(
                        "10.76.51.111",
                        55533,
                        function() {
                            me.msg = "socket is ready"
                        },
                        function(errorMessage) {
                            me.msg = "socket is error"
                        });
                }catch (e) {
                    alert(e);
                }
            },
            uploadfile() {
                /*var uri = encodeURI("http://10.76.30.38:8081/index.html");
                var fileURL = 'cdvfile://localhost/temporary/downloadFile/index.html';
                var me = this;
                this.fileTranObj.download(
                    uri, fileURL, function (entry) {
                        alert('download complete: ' + entry.toURL())
                        upload(entry.toURL());
                    },
                    function (error) {
                        alert('download error: ' + error.source + error.target + error.code)
                    },
                    false, {
                        headers: {
                            'Authorization': 'Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=='
                        }
                    }
                );*/

                //使用FileTransfer插件，上传文件
                function upload(fileURL) {
                    //上传成功
                    /* var success = function (r) {
                        alert("上传成功! Code = " + r.responseCode);
                    }
                    //上传失败
                    var fail = function (error) {
                        alert("上传失败! Code = " + error.code);
                    }

                    var options = new FileUploadOptions();
                    options.fileKey = "file";   // 表单元素的名称。同input标签中的name属性。
                    options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1); // 文件名称
                    alert("文件名称"+options.fileName);
                    //options.mimeType = "text/plain";   // 文件类型，默认是image/jpeg

                    var params = {};
                    params.value1 = "test";
                    params.value2 = "param";

                    options.params = params;

                    //上传地址
                    var SERVER = encodeURI("http://10.76.30.38:8081/upload");
                    me.fileTranObj.upload(fileURL, SERVER, success, fail, options);
                    me.fileTranObj.onprogress = function(progressEvent) {
                        if (progressEvent.lengthComputable) {
                            console.log(progressEvent.loaded / progressEvent.total);
                        } else {
                            loadingStatus.increment();
                        }
                    };*/
                }
            }
        },
        mounted(){
            /*document.addEventListener("deviceready", onDeviceReady, false);
            var me = this;
            /!** //文件下载上传
             function onDeviceReady() {
          me.fileTranObj = new window.FileTransfer();
          me.msg = "FileTransfer is ready"
      }*!/
            //socket example

            function onDeviceReady() {
                var socket = new Socket();
                me.socketObj = socket;
                socket.onData = function(data) {
                    alert(data);
                    me.msg = data;
                };
                socket.onError = function(errorMessage) {
                    me.msg = "errorMessage";
                };
                socket.onClose = function(hasError) {
                    me.msg = "hasError";
                };
                socket.open(
                    "10.76.51.111",
                    55533,
                    function() {
                        me.msg = "socket is ready"
                    },
                    function(errorMessage) {
                        me.msg = "socket is error"
                    }
                );
            }*/
        },
        beforeRouteLeave (to, from, next) {
            window.document.body.style.backgroundColor = ''
            next()
        },
    }
</script>
<style>
  h2 {
    font-family: Candara,Calibri,Segoe,Segoe UI,Optima,Arial,sans-serif;
    color: #888;
  }

  .page.has-navbar .page-content {
    padding-top: 100px;
  }
</style>
