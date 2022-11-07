/* eslint-disable */
// 2022-3-24 debounce ts版本


// 空函数定义
type TAnyFunction = (...args: any[]) => void

function debounce(fn: TAnyFunction, delay: number = 0): TAnyFunction {
  let timer: ReturnType<typeof setTimeout> = null;
  return (...args: any[]) => {
    console.log(`debounce exec`, +new Date);
    clearTimeout(timer);
    timer = setTimeout(fn.bind(this, ...args), delay);
  };
}

let oldTime = +new Date();

const cb = debounce(function (event) {
  console.log(`callback exec`, +new Date)
  console.log(`间隔 ${+new Date() - oldTime}ms执行 mousemove`, event);
}, 500);

const a = 1;
let i = 0
while(i < 999) {
  console.log(`i`, i)
  cb({
    a: 1
  })
  i++
}