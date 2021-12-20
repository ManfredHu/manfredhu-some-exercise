

import {createHash} from 'crypto'

/**
 * @param {string} algorithm
 * @param {any} content
 *  @return {string}
 */
export const encrypt = (algorithm, content) => {
    let hash = createHash(algorithm)
    hash.update(content)
    return hash.digest('hex')
}

/**
 * @param {any} content
 *  @return {string}
 */
export const sha1 = (content) => encrypt('sha1', content)

/**
 * @param {any} content
 *  @return {string}
 */
export const md5 = (content) => encrypt('md5', content)

export const genWebSocketAccept = (content) => {
  let hash = createHash('sha1')
  hash.update(content + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')
  return hash.digest('base64')
}
// var crypto = require('crypto');
// var s = 'the quick brown fox';
// var sha = crypto.createHash('sha1');
// sha.update(s);
// var ret = sha.digest('base64');
// console.log(ret);
// sha1('Jyj8BMLkZNg1N3qA+lQy3Q==' + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11') // nv78PSJiBOUQYeX+a5Ju/ZpZVH0=
// console.log(Buffer.from(sha1('Jyj8BMLkZNg1N3qA+lQy3Q==' + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')).toString('base64')) // OWVmZWZjM2QyMjYyMDRlNTEwNjFlNWZlNmI5MjZlZmQ5YTU5NTQ3ZA==

console.log(genWebSocketAccept('Jyj8BMLkZNg1N3qA+lQy3Q==')) // nv78PSJiBOUQYeX+a5Ju/ZpZVH0=