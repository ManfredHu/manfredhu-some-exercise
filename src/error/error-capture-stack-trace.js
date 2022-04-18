// http://nodejs.cn/api/errors.html#class-syntaxerror
// const myObject = {};
// Error.captureStackTrace(myObject);
// console.log(myObject.stack);  // 类似于`new Error().stack`)

// Error
//     at file:///Users/manfredhu/Documents/leetcode-ts/src/error/error-capture-stack-trace.js:2:7
//     at ModuleJob.run (internal/modules/esm/module_job.js:183:25)
//     at async Loader.import (internal/modules/esm/loader.js:178:24)
//     at async Object.loadESM (internal/process/esm_loader.js:68:5)
//     at async handleMainPromise (internal/modules/run_main.js:59:12)


function MyError() {
  Error.captureStackTrace(this, MyError); // 第二个参数是屏蔽MyError的堆栈信息
  // Error.captureStackTrace(this);
}

// 如果不将 MyError 传给 captureStackTrace，
// 则 MyError 帧将显示在 .stack 属性中。
// 通过传入构造函数，则省略该帧，并保留其下方的所有帧。
console.log(new MyError().stack)

// Error
//     at file:///Users/manfredhu/Documents/leetcode-ts/src/error/error-capture-stack-trace.js:21:13
//     at ModuleJob.run (internal/modules/esm/module_job.js:183:25)
//     at async Loader.import (internal/modules/esm/loader.js:178:24)
//     at async Object.loadESM (internal/process/esm_loader.js:68:5)
//     at async handleMainPromise (internal/modules/run_main.js:59:12)


// Error
//     at new MyError (file:///Users/manfredhu/Documents/leetcode-ts/src/error/error-capture-stack-trace.js:15:9)
//     at file:///Users/manfredhu/Documents/leetcode-ts/src/error/error-capture-stack-trace.js:21:13
//     at ModuleJob.run (internal/modules/esm/module_job.js:183:25)
//     at async Loader.import (internal/modules/esm/loader.js:178:24)
//     at async Object.loadESM (internal/process/esm_loader.js:68:5)
//     at async handleMainPromise (internal/modules/run_main.js:59:12)