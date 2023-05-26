import { WebSocketServer } from 'ws';
import dayjs from 'dayjs'

const wss = new WebSocketServer({ port: 8723 });
console.log(`ws服务启动完成`)
wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    console.log(`原始消息: ${data}`);
    // console.log(`data`, +data)
    const timeStr = dayjs(Number(data)).format('YYYY-MM-DD HH:mm:ss')
    // console.log(`timeStr`, timeStr)
    console.log(`收到消息: ${timeStr}`);
  }); 
  console.log(`ws服务发送信息`)
  ws.send('something');
});