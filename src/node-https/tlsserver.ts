import tls from 'tls';
import fs from 'fs';

const options = {
  key: fs.readFileSync('./keys/server.key'),
  cert: fs.readFileSync('./keys/server.crt'),

  // This is necessary only if using client certificate authentication.
  requestCert: true,

  // This is necessary only if the client uses a self-signed certificate.
  ca: [fs.readFileSync('./keys/ca.crt')]
};
const server = tls.createServer(options, (stream) => {
  console.log(
    'server connected',
    stream.authorized ? 'authorized' : 'unauthorized'
  );
  stream.write('welcome!\n');
  stream.setEncoding('utf8');
  stream.pipe(stream);
});
server.listen(8000, () => {
  console.log('server bound');
})