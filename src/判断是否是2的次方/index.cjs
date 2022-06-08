const method1 = '方法一'
console.time(method1)
function isPowerOf2(x) {
  return Math .log2(x) % 1 === 0 // log2取值为整数
}

for (let i = 0; i < 1000; i++) {
  isPowerOf2(i)
}

console.timeEnd(method1)


const method2 = '方法二'
console.time(method2)
function isPowerOf2Methods2(x) {
  return x & (x-1) === 0 // 位运算，比如8和7做&运算
}

for (let i = 0; i < 1000; i++) {
  isPowerOf2Methods2(i)
}

console.timeEnd(method2)

// 结论，位运算效率高很多，几十倍差距