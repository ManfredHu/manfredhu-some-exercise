type Fn = (...args: any[]) => void;

// 另一个范型要缩小范围到函数要怎么写？
type FunctionReturnType<
  T extends Fn // 注意这里，缩小了范型的范围为函数
> = T extends (...args: any) => infer R ? R : T;

// -------------------------------------------------
// 异步函数 Promise
type AsyncFunctionReturnType<
  T extends Fn // 注意这里，缩小了范型的范围为函数
> = T extends (...args: any) => Promise<infer R> ? R : T; // 这里T如果是异步函数的子集，而且需要推断异步函数返回值类型

type asyncFn = (...args: any[]) => Promise<number>; // 一个返回number类型的异步函数

type test = AsyncFunctionReturnType<asyncFn> // type test = number

// let bill: Readonly<{
//   scores: number[];
//   profile: {
//     level: number;
//   };
// }>;

let test = { a: 1} as const; // test.a 变为 readonly
const tuple = ["tesla", "model 3", "model X", "model Y"] as const; // 数组的每一项都变为readonly


// const bill: {
//   readonly name: "Bill";
//   readonly profile: {
//     readonly level: 1;
//   };
//   readonly scores: readonly [90, 65, 80];
// };