
const Koa = require('koa')
const path = require('path')
const ws = require('ws')
const app = new Koa()

// app.use(require('koa-static')(path.join(__dirname) + '/public'))

let server = app.listen(4000, () => {
  let port = server.address().port
  console.log('应用实例，访问地址为 http://localhost:' + port)
})

// 这里pong会自动发送以保持心跳，当不再执行了，则这个client为断开
function heartbeat() {
  console.log(`heartbeat exec`)
  this.isAlive = true;
}

const wss = new ws.Server({ server })
wss.on('open', function connection(ws) {
  console.log(`wss open`);
})
wss.on('connection', function connection(ws) {
  console.log(`wss connection`);
  ws.isAlive = true;
  // 监听pong💗回包
  ws.on('pong', heartbeat);
  ws.on('message', function incoming(message) {
    console.log('received: %s', message)
    ws.send(`server receive msg: message`)
  })
})

const interval = setInterval(function ping() {
  // 每30s向所有clients广播ping消息
  console.log(`wss.clients 数量`, wss?.clients)
  wss.clients.forEach(function each(ws) {
    console.log(`ws连接信息`)
    if (ws.isAlive === false) {
      console.log(`ws连接死掉`)
      return ws.terminate();
    }
    console.log(`set ws deaded`)
    ws.isAlive = false;
    ws.ping();
  });
}, 5000);

// 停止连接时候清除定时器
wss.on('close', function close() {
  console.log(`wss close`);
  clearInterval(interval);
});