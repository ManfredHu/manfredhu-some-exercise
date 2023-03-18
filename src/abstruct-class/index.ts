/* eslint-disable no-proto */
abstract class Common {
  public a = 'a'

  public publicCommonMethod() {
    console.log("publicCommonMethod");
  }

  public callName() {
    console.log('common callName execute')
  }

  protected protectedCommonMethod() {
    console.log("protectedCommonMethod");
  }

  private privateCommonMethod() {
    console.log("privateCommonMethod")
  }
}

class Abc extends Common {
  public name = ''
  public constructor() {
    super();
    this.name = 'abc'
  }

  public callName() {
    super.callName()
    console.log('Abc callName execute')
    // this.publicCommonMethod()
    // this.protectedCommonMethod()
    // this.privateCommonMethod() // error
  }
}

const aInstance = new Abc()
console.log(aInstance.callName());


console.log('aInstance:', aInstance); // { a: 'a', name: 'abc' }
console.log('Object.getOwnPropertyDescriptors(aInstance)', Object.getOwnPropertyDescriptors(aInstance))
// @ts-ignore
console.log('aInstance.__proto__', aInstance.__proto__) // Common {}
// @ts-ignore
console.log('Object.getOwnPropertyDescriptors(aInstance.__proto__)', Object.getOwnPropertyDescriptors(aInstance.__proto__)) // class Abc extends Common的方法，包括constructor
// @ts-ignore
console.log('Object.getOwnPropertyDescriptors(aInstance.__proto__.__proto__)', Object.getOwnPropertyDescriptors(aInstance.__proto__.__proto__)) // abstract class Common 的方法
