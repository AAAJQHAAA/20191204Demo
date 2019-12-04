import crc from '../common/CRC'
/**
 * 使用cordova打包成apk
 * sockets-for-cordova插件对本应用的一些方法
 */
var socket={}
/**
 * 获取连接的方法
 */
socket.getConnectServer=(host,port)=>{
  var Socket= new Socket();
  Socket.open(
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
    return Socket
}
/**
 * config的一些发送数据方法
 */
socket.sendTime=(sock,date)=>{
  alert('提交时间')
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
  sock.write(data,
    function() {
      alert('发送成功')
    },
    function(errorMessage) {
      alert('发送失败')
    });
}

export default socket
