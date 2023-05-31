import http2 from 'http2';
import fs from 'fs';
import { dirname, resolve }from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const options  = {
  key: fs.readFileSync('./keys/server.key'),
  cert: fs.readFileSync('./keys/server.crt')
}
const server = http2.createSecureServer(options);

server.on("error", (err) => console.log(err));

server.on("stream", (stream, headers) => {
  const path = headers[":path"];
  if (path === "/") { // html file
    console.log('headers', headers)
    const p = resolve(__dirname, './http2-static/index.html')
    const html = fs.readFileSync(p);
    stream.respond({
      "content-type": "text/html; charset=utf-8",
      ":status": 200,
    });
    stream.write(html);
    stream.end();
  } else if (path?.endsWith(".png")) {
    console.log(path)
    const p = resolve(__dirname, './http2-static', '.' + path)
    const img = fs.readFileSync(p);
    stream.respond({
      "content-type": "image/*",
      ":status": 200,
    });
    stream.write(img);
    stream.end();
  }
});

server.listen(8003, () => {
  console.log('server started, port 8003. open https://localhost:8003/ to visit')
});
w