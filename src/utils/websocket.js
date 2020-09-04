import { Message } from 'element-ui';

export const WebSocketTst = () => {
  if (!('WebSocket' in window)) { // 不支持WebSocket的情况
    Message({
      message: '浏览器不支持 Web Socket',
      type: 'error',
      duration: 1500
    });
    return;
  }
  // 打开一个 web socket
  let ws = new WebSocket('ws://192.168.7.71:1000/ws');
  console.log(ws.readyState);
  // 连接建立后的回调函数
  ws.onopen = () => {
    console.log(1);
    // 使用 send() 方法发送数据
    ws.send('admin:123456');
  };
  console.log(ws.readyState);
  // 接收到服务器消息后的回调函数
  ws.onmessage = (evt) => { 
    var received_msg = evt.data;
    if (received_msg.indexOf("sorry") == -1) {
      // console.log("收到消息：" + received_msg);
    }
    // 连接关闭后的回调函数
    // ws.onclose = () => { 
    //    // 关闭 websocket
    //    alert("连接已关闭..."); 
    // };
  };
}