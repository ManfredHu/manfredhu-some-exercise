
const EventEmitter = require('events');
const myEE = new EventEmitter();
myEE.on('1', () => console.log('a'));
myEE.on(1, () => console.log('a1'));
myEE.prependListener('1', () => console.log('b'));
myEE.emit(1);
