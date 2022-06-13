import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// timer
// pending callbacks
// idle,prepare
// poll
// check
// close

console.log('import.meta.url', import.meta.url)
const __filename = fileURLToPath(import.meta.url);
console.log('__filename', __filename)
const __dirname = path.dirname(__filename);
console.log('__dirname', __dirname)

// =======================测试一====================================================
// timers阶段
const startTime = Date.now();
setTimeout(() => {
  const endTime = Date.now();
  console.log(`[timer] timers: ${endTime - startTime}`);
}, 4);

// poll阶段(等待新的事件出现)
const readFileStart = Date.now();
fs.readFile(path.resolve(__dirname, './Demo.txt'), (err, data) => {
  if (err) throw err;
  let endTime = Date.now();
  // 获取文件读取的时间
  console.log(`[poll] read time: ${endTime - readFileStart}`);
  // 通过while循环将fs回调强制阻塞5000s
  while (endTime - readFileStart < 5000) {
    endTime = Date.now();
  }
});

// check阶段
setImmediate(() => {
  console.log('[check] check阶段')
})

// output
// [check] check阶段
// [timer] timers: 2
// [poll] read time: 2

// 1. 同步任务执行，依次执行setTimeout,fs.readFile,setImmediate
// 2. 进入event loop，setTimeout继续检测时间任务还没放到timer队列，timer队列为空。检查timer队列没有符合时间的回调，进入poll阶段
// 3. poll阶段有I/O任务，执行任务，队列为空且有setImmediate任务，进入check阶段
// 4. 执行setImmediate回调，队列清空，进入下一个阶段close，没有任务进入下一次循环
// 5. timer还没到时间(4ms)，队列为空进入poll阶段，任务完成（2ms），poll队列增加回调任务，执行回调
// 6. 阻塞5s释放，没有setImmediate任务，进入下一次循环
// 7. 再次进入timer，检测时间超过4ms，执行setTimeout回调