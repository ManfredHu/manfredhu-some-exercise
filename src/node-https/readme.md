# tls握手
模拟tls收发消息过程

1. tls-server.ts为server文件, 通过`npx esno tls-server.ts`启动
2. `cleint/tls-client.ts`为客户端文件, 通过`npx esno cleint/tls-client.ts`启动

# https
`https-server.ts`为https server, 通过`npx esno https-server.ts`启动

1. 浏览器打开 [https://localhost:8003/](https://localhost:8003/) 访问
2. `cleint/https-client.ts`为客户端文件, 通过`npx esno cleint/https-client.ts`启动
    ```
    $ npx esno https-client.ts
    statusCode: 200
    headers: {
      date: 'Fri, 26 May 2023 03:27:18 GMT',
      connection: 'close',
      'transfer-encoding': 'chunked'
    }
    hello world
    ```

wiresharz抓包可以看 ./wireshark/https.pcapng 文件

# http2
`http2-server.ts`为http2 server, 通过`npx esno http2-server.ts`启动

1. 浏览器打开 [https://localhost:8003/](https://localhost:8003/) 访问

wiresharz抓包可以看 ./wireshark/http2.pcapng 文件