/* eslint-disable */
// 接口重试


// 并发10个请求，每个请求在返回错误码为非0时候重试3次，每次间隔2s
// 假设错误请求示例如下
// {ret: -1, errMsg: "not data", requestParams: 根据请求参数重新返回}

// 并发请求会想到promise.all，但是如果里面的请求reject了，则promise.all会catch。重试需要用到闭包，缓存重试次数times
interface Resp {
  ret: number,
  errMsg?: string
  requestParams: any
}
function getData(requestParams: any): Promise<Resp> {
  return new Promise(resolve => setTimeout(() => {
    // 间隔100ms返回请求错误
    resolve({
      ret: -1,
      // ret: 0,
      errMsg: "not data",
      requestParams
    } as Resp)
  }, 100))
}

// 1.普通的一个请求的过程
// (async () => {
//   console.log(await getData({
//     type: 1
//   }))
// })()

// 2.并发10个请求
// (async () => {
//   // 创建1-10的数组
//   // const incrementArr = Array.from(new Array(10).keys()) // Array.from 接收迭代器参数
//   const incrementArr = [...new Array(10).keys()] // ...展开迭代器
//   const rstArr = await Promise.all(incrementArr.map(item => getData(item)))
//   console.log(rstArr)
// })()

// 3.重试3次，每次间隔2s
const retryTime = 3;
const retryInterval = 2000;

function sleep(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay))
}
(async () => {
  async function getDataRetry(parasm, times, interval) {
    console.log(`getDataRetry ${times}`, Number(new Date))
    getData(parasm).then(res => {
      console.log(`getDataRetry res`, res)
      if (res.ret !== 0) {
        throw new Error(JSON.stringify(res))
      } else return res
    }).catch(async err => {
      if (--times) {
        await sleep(interval)
        return await getDataRetry(parasm, times, interval)
      } else {
        throw err
      }
    })
  }
  // 单个间隔2000ms重试3次
  // const result = await getDataRetry(1, retryTime, retryInterval)
  // console.log(result)
  
  // 10个间隔2000ms重试3次
  // 创建1-100的数组
  const incrementArr = [...new Array(10).keys()] // ...展开迭代器

  // 这里只要并发调用就好了，不关心返回值

  // 并发调用方法一
  // incrementArr.forEach(item => getDataRetry(item, retryTime, retryInterval))

  // 并发调用方法二
  Promise.all(incrementArr.map(item => getDataRetry(item, retryTime, retryInterval)))
})()

