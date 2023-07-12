# ZSTD
对比Zip, ZSTD是一种更高效的压缩算法.
Zstandard（缩写为Zstd）是一种高效的无损数据压缩算法，它可以在高压缩比和快速解压缩速度之间取得平衡
它是现在主流离线包, 如小程序等采用的压缩算法

## 安装
- Mac `brew install zstd`
- Linux `sudo apt-get install zstd`

## 压缩文件

```bash
$ zstd -o template.zst -19 template.js
zstd: template.zst already exists; overwrite (y/n) ? y
template.js          : 21.98%   (  1.70 MiB =>    382 KiB, template.zst)

# -19 参数含义: Zstd提供了多个压缩级别，可以通过使用 -# 参数来指定压缩级别，其中#是从1到19的数字，表示压缩级别，数字越大压缩比越高但速度越慢。
```

1.8M大小的template.js, 最后zip压缩为516KB, ZSTD算法最大登记压缩(最慢)最后大小为392KB.

## 解压缩文件

```BASH
$ zstd -d -o template2.js template.zst
template.zst        : 1781303 bytes
```

解压后文件与压缩前一直, ZSTD是无损的.

## 代码增量发布

### 增量代码patch生成
```
node src/diff-test/index.js
```
运行如上命令生成test_diff.patch增量包

### 应用patch更新代码
```
node src/diff-test/apply-patch.js
```
运行如上命令生成test_diff.patch增量包