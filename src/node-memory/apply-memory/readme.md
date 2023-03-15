根据 https://nodejs.org/en/docs/guides/simple-profiling/

将gc.js以参数 `--prof` 执行后生成类似 `isolate-0x108008000-47537-v8.log` 的日志文件

```bash
node --prof gc.js
```

再依赖node 自带的分析器加上 `--prof-process` 处理成格式化后的日志 `processed.txt`
```bash
node --prof-process isolate-0x108008000-47537-v8.log
```