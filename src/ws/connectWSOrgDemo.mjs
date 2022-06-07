// 2021/12/26 扑街了，运行不了
import WebSocket, { createWebSocketStream } from "ws";

const ws = new WebSocket("wss://echo.websocket.org/", {
  origin: "https://websocket.org",
});

const duplex = createWebSocketStream(ws, { encoding: "utf8" });

duplex.pipe(process.stdout);
process.stdin.pipe(duplex);
