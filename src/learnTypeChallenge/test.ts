"use strict";

// function deepFreeze<T>(obj: T) {
//   var propNames = Object.getOwnPropertyNames(obj);
//   for (let name of propNames) {
//     let value = (obj as any)[name];
//     if (value && typeof value === "object") {
//       deepFreeze(value);
//     }
//   }
//   return Object.freeze(obj);
// }

// type Person = {
//   name: string;
//   profile: {
//     level: number;
//   };
//   scores: number[];
// };

// const bill: Immutable<Person> = deepFreeze({
//   name: "Bill",
//   profile: {
//     level: 1,
//   },
//   scores: [90, 65, 80],
// });

// type Immutable<T> = {
//   readonly [K in keyof T]: Immutable<T[K]>;
// };

// bill.name = 123;


let timer: ReturnType<typeof setTimeout> = setTimeout(() => {
  // do something
})



