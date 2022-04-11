// from https://mp.weixin.qq.com/s/8RA0P-nZV6Sr22A5Z2vx_Q?forceh5=1
// 由于 TypeScript 支持 constructor 参数(private、protected、public、readonly)隐式自动定义为 class 属性 (Parameter Property)，因此无需使用 this.a = a。Nest 中都是这样的写法。
class Foo {
  constructor(public firstName: string, private lastName: string, protected email: string) {
    // 注意这里没有使用name
  }
}

console.log(new Foo('manfred', 'hu', 'manfredhufe@gmail.com'))