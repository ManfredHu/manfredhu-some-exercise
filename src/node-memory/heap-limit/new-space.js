const showMem = () => {
  const mem = process.memoryUsage();
  const format = bytes => {
    if (bytes < 1024) {
      return `${bytes}B`
    } else if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(2)}KB`
    } else if (bytes < 1024 * 1024 * 1024) {
      return `${(bytes / 1024 / 1024).toFixed(2)}MB`
    } else if (bytes < 1024 * 1024 * 1024 * 1024) {
      return `${(bytes / 1024 / 1024 / 1024).toFixed(2)}GB`
    } else if (bytes < 1024 * 1024 * 1024 * 1024 * 1024) {
      return `${(bytes / 1024 / 1024 / 1024 / 1024).toFixed(2)}TB`
    }
  }
  console.log(`Process: heapTotal ${format(mem.heapTotal)} heapUsed ${format(mem.heapUsed)} rss ${format(mem.rss)}`);
  console.log(`------------------------------------------------`);
}

const perIncrement = 10 * 1024 * 1024 // 10MB
const allTimes = 100

// 每次创建perIncrement定长的Array返回
const useMem = () => {
  const size = perIncrement
  const arr = new Array(size);
  for (let i = 0; i < size; i++) {
    arr[i] = 0;
  }
  return arr;
}

let total = [];
// 循环 allTimes 次, 每次增加useMem大小的数据到内存里
const getTotal = () => {
  for (let j = 0; j < allTimes; j++) {
    showMem();
    total.push(useMem());
  }
  return total;
}

getTotal();
