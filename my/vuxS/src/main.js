import Vue from 'vue'
import App from './App'
import router from './router'
import i18n from './vuei18n'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  render: h => h(App)
})

// import {request} from './network/myaxios'
// request({
//   url:'/get'
// }).then(res=>{
//   console.log("成功："+res)
//   console.log(res)
// }).catch(err=>{
//   console.log(err)
// })

//只精确到秒
// var timestamp1 = Date.parse(new Date())
// //精确到毫秒
// var timestamp2 = (new Date()).valueOf()
// var timestamp3=new Date().getTime()
// console.log(timestamp1)
// console.log(timestamp2)
// console.log(timestamp3)
// import SockJS from "sockjs-client";
// import Stomp from "stompjs";
// let sock = new SockJS('http://192.168.121.93:55533');
// console.log(sock.readyState)
// sock.onopen = function() {
//   console.log('open');
// };
