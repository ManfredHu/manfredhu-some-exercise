import tls from 'tls';
import fs from 'fs';

const options = {
  key: fs.readFileSync('./client.key'),
  cert: fs.readFileSync('./client.crt'),

  // This is necessary only if using client certificate authentication.
  // requestCert: true,

  // This is necessary only if the client uses a self-signed certificate.
  ca: [fs.readFileSync('../keys/ca.crt')]
  // Necessary only if the server's cert isn't for "localhost".
  // checkServerIdentity: () => { return null; },
};
const socket = tls.connect(8000, options, () => {
  console.log('client connected',
              socket.authorized ? 'authorized' : 'unauthorized');
  process.stdin.pipe(socket);
  process.stdin.resume();
});
socket.setEncoding('utf8');
socket.on('data', (data) => {
  console.log(data);
});
socket.on('end', () => {
  console.log('server ends connection');
});
