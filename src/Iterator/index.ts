const obj = {
  [Symbol.iterator]: () => {
    return {
      someValue: 1, // 不管这个值，Iterator只管next方法
      next() {
        if (this.someValue < 100) {
          return {
            done: false,
            value: this.someValue++
          }
        } else {
          return {
            done: true
          }
        }
      }
    }
  }
}

for (const item of obj) {
  console.log(item)
}