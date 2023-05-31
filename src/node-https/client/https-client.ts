import https from 'https';
import fs from 'fs';

let options: any = {
  hostname: 'localhost',
  port: 8003,
  path: '/',
  method: 'GET',
  key: fs.readFileSync('./client.key'),
  cert: fs.readFileSync('./client.crt'),
  // This is necessary only if the client uses a self-signed certificate.
  ca: [fs.readFileSync('../keys/ca.crt')]
  // Necessary only if the server's cert isn't for "localhost".
  // checkServerIdentity: () => { return null; },
};
options.agent = new https.Agent(options);

const req = https.request(options, (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);
  res.on('data', (d) => {
    process.stdout.write(d);
  });
});
req.end();
req.on('error', (e) => {
  console.error(e);
});
