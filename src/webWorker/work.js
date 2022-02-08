
// console.log(`self`, self)
// self.addEventListener(
//   "message",
//   function (e) {
//     console.log(`收到消息`, e.data)
//     // self.postMessage("You said: " + e.data);
//   },
//   false
// );

// self.addEventListener(
//   "message",
//   function (e) {
//     var data = e.data;
//     console.log(`data`, data)
//     switch (data.cmd) {
//       case "start":
//         self.postMessage("WORKER STARTED: " + data.msg);
//         break;
//       case "stop":
//         self.postMessage("WORKER STOPPED: " + data.msg);
//         self.close(); // Terminates the worker.
//         break;
//       default:
//         // self.postMessage("Unknown command: " + data.msg);
//     }
//   },
//   false
// );

// importScripts("script1.js", "script2.js");

// self.close();

self.onmessage = function (e) {
  var uInt8Array = e.data;
  console.log(
    `uInt8Array`,
    uInt8Array,
    uInt8Array.toString(),
    uInt8Array.byteLength
  );
  // postMessage(
  //   "Inside worker.js: uInt8Array.toString() = " + uInt8Array.toString()
  // );
  // postMessage(
  //   "Inside worker.js: uInt8Array.byteLength = " + uInt8Array.byteLength
  // );
};