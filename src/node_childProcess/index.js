// child_process fork一个子进程，然后
const fork = require('child_process').fork;
const path = require('path')
console.log(`index start`)
console.log(`index process.argv`, process.argv)

const child_argv = [
  '--foo',
  '--bar',
  '--fuck',
  '--you'
]

const ls = fork(path.resolve(__dirname, "./child.js"), child_argv.slice(2))
console.log(`fork file suc`, ls)

var count = 0;

ls.on('exit', (code) => {
  console.log(`child_process exited with code ${code}`);
});

ls.on('message', (msg) => {

  console.log(`PARENT: message from child process is ${msg}`);

  count = parseInt(msg) + 1;
  console.log("PARENT: +1 from parent");

  ls.send(count);

});