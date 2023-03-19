const http = require('http');
const net = require('net');
const crypto = require('crypto');

const server = http.createServer();

server.on('upgrade', (req, socket) => {
  const headers = req.headers;
  const key = headers['sec-websocket-key'];
  const hash = crypto.createHash('sha1').update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest('base64');

  socket.write('HTTP/1.1 101 Switching Protocols\r\n');
  socket.write('Upgrade: websocket\r\n');
  socket.write('Connection: Upgrade\r\n');
  socket.write(`Sec-WebSocket-Accept: ${hash}\r\n`);
  socket.write('\r\n');

  // 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
  // +-+-+-+-+-------+-+-------------+-------------------------------+
  // |F|R|R|R| opcode|M| Payload len |    Extended payload length    |
  // |I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
  // |N|V|V|V|       |S|             |   (if payload len==126/127)   |
  // | |1|2|3|       |K|             |                               |
  // +-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
  // |     Extended payload length continued, if payload len == 127  |
  // + - - - - - - - - - - - - - - - +-------------------------------+
  // |                               |Masking-key, if MASK set to 1  |
  // +-------------------------------+-------------------------------+
  // | Masking-key (continued)       |          Payload Data         |
  // +-------------------------------- - - - - - - - - - - - - - - - +
  // :                     Payload Data continued ...                :
  // + - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
  // |                     Payload Data continued ...                |
  // +---------------------------------------------------------------+

  // FIN: 结束位标识, 默认0. 如果为1表示数据帧为最后一帧
  // RESV1-3: 三个表示都是1bit长(0或1),  必须设置为0，除非扩展了非0值含义的扩展。如果收到了一个非0值但是没有扩展任何非0值的含义，接收终端必须断开WebSocket连接
  // Opcode: 4 bit长,用于枚举操作
  //   - %x0 表示一个持续帧
  //   - %x1 表示一个文本帧
  //   - %x2 表示一个二进制帧
  //   - %x3-7 预留给以后的非控制帧
  //   - %x8 表示一个连接关闭包
  //   - %x9 表示一个ping包
  //   - %xA 表示一个pong包
  //   - %xB-F 预留给以后的控制帧
  // Mask: 1 bit, mask标志位，定义payload是否添加掩码。如果设置为1，那么掩码的键值存在于Masking-Key中. 客户端发送服务端时为1, 服务端发送客户端为0
  // Payload length: 7 bits, 7+16 bits, or 7+64 bits.
  //   - 如果值为0-125，那么就表示负载数据的长度
  //   - 如果是126，那么接下来的2个bytes解释为16bit的无符号整形作为负载数据的长度
  //   - 如果是127，那么接下来的8个bytes解释为一个64bit的无符号整形（最高位的bit必须为0）作为负载数据的长度
  // Masking-Key: 0 or 4 bytes. 对应上面Mask, 客户端发送为1, 是一个32bit长的Key, 用于解密数据
  // Payload Data: 传输的数据, 位数为8的倍数代码
  socket.on('data', (data) => {
    console.log('data', data, data.length);
    // data: <Buffer 81 8e 01 4f 34 33 49 2a 58 5f 6e 63 14 40 64 3d 42 56 73 61>
    // 每一个数字都是[0-9a-f]组成, 共0-255bit, 即32个字节.二进制如下
    // 81 8e: 10000001 10001110 表示FIN=1, opcode=1, mask=1, payload length=14, 因为发送的"Hello, server."是14个字符,每个字符对应1个字节存储
    // 01 4f 34 33 : 00000001 01001111 00110100 00110011, 因为前置设置了Mask=1说明有Masking-Key, 这里就是Masking-Key, 用于解密数据
    // 49 2a 58 5f 6e 63 14 40 64 3d 42 56 73 61: 01001001 00101010 01011000 01011111 01101110 01100011 00010100 01000000 01100100 00111101 01000010 01010110 01110011 01100001, 这段位payload

    // 精彩的来了, 这里js无法直接处理bit的数据, 通过将0b开头表示2进制, 通过 &1 和 >> 处理得到某个bit的值
    const fin = (data[0] & 0b10000000) >> 7; // 取first bit数据
    const opcode = data[0] & 0b00001111; // 取后4bit数据
    const mask = (data[1] & 0b10000000) >> 7; // mask标志位, 客户端过来为1

    let len = data[1] & 0b01111111;
    let index = 2;
    let maskKey = null;
    console.log('Payload len: ', len) // 第一句14
    if (len === 126) {
      len = data.readUInt16BE(index);
      index += 2;
    } else if (len === 127) {
      len = data.readUInt32BE(index) * 0x100000000 + data.readUInt32BE(index + 4);
      index += 8;
    }

    if (mask) {
      maskKey = data.slice(index, index + 4); // data.slice(2,6) 为 01 4f 34 33, 也就是Mask-key为 00000001 01001111 00110100 00110011
      index += 4;
    }
    console.log('Payload data from:', index) // 6, 也就是说payload从32bit*(2+4)开始
    const payload = data.slice(index);

    if (mask) {
      console.log('Masking-key: ', maskKey, maskKey.toString('hex'));
      for (let i = 0; i < payload.length; i++) {
        // 异或XOR运算, 0⊕0=0，1⊕0=1，0⊕1=1，1⊕1=0（同为0，异为1）
        // Mask-key有4个字节32位, 每个字节依次跟payload进行异或运算, 直到最后
        payload[i] ^= maskKey[i % 4];
      }
    }

    if (opcode === 0x8) { // opcode为8表示关闭连接
      // 关闭连接
      const closeCode = payload.readUInt16BE(0);
      const closeReason = payload.slice(2).toString();
      console.log(`Client closed connection with code ${closeCode} and reason '${closeReason}'.`);
      socket.end();
    } else {
      // 处理数据帧
      console.log(`Received payload: ${payload.toString()}`);

      // 发送数据帧, 特别注意的是没有 mask, 自然也就没有Mask-key
      const response = Buffer.alloc(payload.length + 2); // payload是按照数据帧解开的,这里需要把前面的数据帧头部加上
      response[0] = 0b10000001; // FIN=1, opcode=1
      response[1] = payload.length; // payload length
      payload.copy(response, 2); // copy payload to response, 从第2字节开始
      socket.write(response);
    }
  });
});

server.listen(8080, () => {
  console.log('WebSocket server started on port 8080.');
});
