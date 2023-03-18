

// A业务：1 3 4 5 6 7 7 8 9 10
// B业务：1 1 3 4 2 3 4 5 6 7 
// C业务：1 2 4 6 8 3 11 2 3 6
// 业务和：3 6 11 15 16 13 22 15 18 23

// 第一种方法：9+6+8 = 23
// 第二种方法：22
function getMaxSecond(arr) {
  const temp = arr.slice().sort((a,b) => a - b)
  return temp[temp.length - 2]
}
function count() {
  function getRandomNums(len) {
    let temp = [];
    while (len--) {
      temp.push(Math.floor(Math.random() * 100 + 1)); // [1, 100))
    }
    return temp;
  }

  const temp = [];
  for (let i = 0; i < 3; i++) {
    if (!temp[i]) {
      temp[i] = getRandomNums(10);
    }
  }

  console.log(`随机三个数组为`, temp);
  // 方法一 当前数组第二大项求和
  const sum1 = temp.reduce((acc, cur) => {
    return acc += getMaxSecond(cur);
  }, 0);

  // 方法二 每一列的第二大项求和
  let sumTemp = [];
  for (let j = 0; j < temp[0].length; j++) {
    sumTemp[j] = temp[0][j] + temp[1][j] + temp[2][j];
  }
  console.log(`方法二sumTemp`, sumTemp);
  const sum2 = getMaxSecond(sumTemp);
  console.log(`方法一`, sum1);
  console.log(`方法二`, sum2);

  return sum1 > sum2
}

let countSum1 = 0

for(let m = 0; m < 10000; m++) {
  if (count()) {
    countSum1++
  }
}
console.log(`方法一大于方法二次数${countSum1}`, `${countSum1*100/10000}%`)


// .sort((a, b) => a - b)
