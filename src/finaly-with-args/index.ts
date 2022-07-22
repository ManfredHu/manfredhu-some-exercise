const sleepFunc = (ms: number) => new Promise(r => {
  setTimeout(r, ms)
});

const getDataFunc = async (data: any) => {
  await sleepFunc(1000)
  return data
}

Promise.all([getDataFunc(1), getDataFunc(2)]).then((data) => {
  console.log('data', data)
  return data
}).finally(() => {
  console.log('finally') // finally with no args
})