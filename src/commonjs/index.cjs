// eslint-disable-next-line @typescript-eslint/no-require-imports
const a = require('./a.cjs')
// eslint-disable-next-line @typescript-eslint/no-require-imports
const b = require('./b.cjs')
// eslint-disable-next-line no-undef
// console.log(arguments)

// eslint-disable-next-line @typescript-eslint/no-invalid-this
console.log('this === exports === module.exports', this === exports, this === module.exports)
console.log('module.exports', module.exports)
console.log('exports', exports)
// eslint-disable-next-line no-undef, @typescript-eslint/no-invalid-this
console.log('this', this)
console.log('__dirname', __dirname)
console.log('__filename', __filename)


console.log('require.cache[moduleName]', require.cache)
// eslint-disable-next-line no-undef
const Module = module.constructor
console.log('Module._cache', Module._cache)