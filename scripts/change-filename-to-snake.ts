import {
  camelCase,
  capitalCase,
  constantCase,
  dotCase,
  headerCase,
  noCase,
  paramCase,
  pascalCase,
  pathCase,
  sentenceCase,
  snakeCase,
} from "change-case";
import fs from 'fs'

const dir = fs.readdirSync('src')

dir.filter(j => !/^\./.test(j)).forEach(item => {
  if (/^[a-z0-9A-Z-_]+$/g.test(item)) {
    // console.log('change dir name to paramCase', item, paramCase(item))
    fs.renameSync(`src/${item}`, `src/${paramCase(item)}`)
  } 
})