process.on('unhandledRejection', (err) => {
  console.error(`unhandledRejection 捕获错误`, err)
})
// global.onerror = (event) => {
//   console.log(`window.onerror捕获错误`, event)
// }
process.on('uncaughtException', (err) => {
  console.error(`uncaughtException 捕获错误`, err)
})
// try {
//   a
// } catch(err) {
//   console.error('捕获错误', err)
// }

// a

new Promise(resolve => setTimeout(resolve, 2000)).then(() => {
  a // 异步错误
})