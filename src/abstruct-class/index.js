"use strict";
/* eslint-disable no-proto */
class Common {
    a = 'a';
    publicCommonMethod() {
        console.log("publicCommonMethod");
    }
    callName() {
        console.log('common callName execute');
    }
    protectedCommonMethod() {
        console.log("protectedCommonMethod");
    }
    privateCommonMethod() {
        console.log("privateCommonMethod");
    }
}
class Abc extends Common {
    name = '';
    constructor() {
        super();
        this.name = 'abc';
    }
    callName() {
        super.callName();
        console.log('Abc callName execute');
        // this.publicCommonMethod()
        // this.protectedCommonMethod()
        // this.privateCommonMethod() // error
    }
}
const aInstance = new Abc();
console.log(aInstance.callName());
console.log('aInstance:', aInstance); // { a: 'a', name: 'abc' }
console.log('Object.getOwnPropertyDescriptors(aInstance)', Object.getOwnPropertyDescriptors(aInstance));
// @ts-ignore
console.log('aInstance.__proto__', aInstance.__proto__); // Common {}
// @ts-ignore
console.log('Object.getOwnPropertyDescriptors(aInstance.__proto__)', Object.getOwnPropertyDescriptors(aInstance.__proto__)); // class Abc extends Common的方法，包括constructor
// @ts-ignore
console.log('Object.getOwnPropertyDescriptors(aInstance.__proto__.__proto__)', Object.getOwnPropertyDescriptors(aInstance.__proto__.__proto__)); // abstract class Common 的方法
