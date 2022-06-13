setTimeout(() => {
  console.log('timeout');
}, 0);

setImmediate(() => {
  console.log('immediate');
});

// output: 
// immediate
// timeout

// 1. 主任务执行，setTimeout执行，在0ms（fix to 1ms）后放入回调，setImmediate执行，check队列放入回调
// 2. timer检测，还没到时间pass到poll阶段，有setImmediate没其他任务直接进入check阶段执行setImmediate回调
// 3. 输出 'immediate'，进入下一个循环
// 4. 检测时间达到，执行回调输出 'timeout'
