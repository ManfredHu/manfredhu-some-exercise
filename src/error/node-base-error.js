import fs from 'fs'

function errorFirstCallback(err, data) {
  if (err) {
    console.error('There was an error', err); // 
    return;
  }
  console.log(data);
}

fs.readFile('/some/file/that/does-not-exist', errorFirstCallback);

// There was an error [Error: ENOENT: no such file or directory, open '/some/file/that/does-not-exist'] {
//   errno: -2,
//   code: 'ENOENT',
//   syscall: 'open',
//   path: '/some/file/that/does-not-exist'
// }

throw new Error(123).code