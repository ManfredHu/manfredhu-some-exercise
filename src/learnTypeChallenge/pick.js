"use strict";
// let bill: Readonly<{
//   scores: number[];
//   profile: {
//     level: number;
//   };
// }>;
let test = { a: 1 }; // test.a 变为 readonly
const tuple = ["tesla", "model 3", "model X", "model Y"]; // 数组的每一项都变为readonly
// const bill: {
//   readonly name: "Bill";
//   readonly profile: {
//     readonly level: 1;
//   };
//   readonly scores: readonly [90, 65, 80];
// };
