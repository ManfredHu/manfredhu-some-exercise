# tls握手
模拟tls收发消息过程

tlsserver.ts为server文件, 通过`npx esno tlsserver.ts`启动

`cleint/tlsclient.ts`为客户端文件, 通过`npx esno cleint/tlsclient.ts`启动

# https
`httpsserver.ts`为https server, 通过`npx esno httpsserver.ts`启动

浏览器打开 [https://localhost:8003/](https://localhost:8003/) 访问

`cleint/httpsclient.ts`为客户端文件, 通过`npx esno cleint/httpsclient.ts`启动

```
$ npx esno httpsclient.ts
statusCode: 200
headers: {
  date: 'Fri, 26 May 2023 03:27:18 GMT',
  connection: 'close',
  'transfer-encoding': 'chunked'
}
hello world
```

