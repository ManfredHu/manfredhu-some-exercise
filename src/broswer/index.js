import http2 from 'http2'
import http from 'http'

const port = 3000;
const options = {
  // HTTP/2 will be downgraded to HTTP/1.x 
  allowHTTP1: true,
};
const server = http2.createServer(options);

server.on('stream', (stream, headers) => {
  stream.respond({
    'content-type': 'text/plain',
    ':status': 200
  });
  stream.end('hello, world from server!');
});

server.listen(port, ()=>{
  // server is ready
  console.log(`Server listening on ${port}!`);

  // Choose true/false!
  const useHTTP2 = false;

  if (useHTTP2) {
    // HTTP/2 GET
    http2.connect(`http://localhost:${port}`)
      .request({":path": "/"})
      // Print body
      .pipe(process.stdout)
  } else {
    // HTTP/1 GET
    http.get(`http://localhost:${port}`, (res)=>{
      // Print body
      res.pipe(process.stdout);
    });
  }
});