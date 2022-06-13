import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// timer
// pending callbacks
// idle,prepare
// poll
// check
// close

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =======================测试二====================================================
// timers阶段
const startTime = Date.now();
setTimeout(() => {
  const endTime = Date.now();
  console.log(`[timer] timers: ${endTime - startTime}`);
}, 0);

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
  const endTime = Date.now();
  console.log(`[check] check阶段, ${endTime - startTime}`)
})

// output
// [check] check阶段, 1
// [timer] timers: 6
// [poll] read time: 7

// 1. 同步任务执行，依次执行setTimeout,fs.readFile,setImmediate
// 2. 进入event loop，setTimeout虽然设置为0，设置0s后把回调放到timer队列，但是此时timer队列为空。检查timer队列没有符合时间的回调，进入poll阶段
// 3. poll阶段队列为空且有setImmediate任务，进入check阶段
// 4. 执行setImmediate回调，进入下一个阶段close，没有任务进入下一次循环
// 5. timer阶段执行2放入的回调，队列清空，进入下一个阶段poll
// 6. 