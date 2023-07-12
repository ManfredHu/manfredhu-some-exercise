import fs from 'fs'
import { spawnSync } from 'child_process'
import path from 'path'
import { dirname, resolve }from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const oldVersionFile = path.resolve(__dirname, './test1.js'); // 旧版本模板文件
const newVersionFile = path.resolve(__dirname, 'test2.js'); // 新版本模板文件
const diffPatchFile = path.resolve(__dirname, 'test_diff.patch'); // 生成的增量包文件

console.log('oldVersionFile', oldVersionFile)
console.log('newVersionFile', newVersionFile)
console.log('diffPatchFile', diffPatchFile)
// 使用 diff 命令生成增量包
const diffProcess = spawnSync('patch', [oldVersionFile, diffPatchFile]);

console.log('patch还原成功:', diffPatchFile);

