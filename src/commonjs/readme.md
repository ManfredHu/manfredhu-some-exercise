# 解析Node模块缓存原理

## module.exports/export/this 其实都是一回事
因为`module.exports`和`export`以及`this`都是同个东西，但是最后缓存的是`module.exports`，所以对`export`跟`this`的更改，都只改了形参，是无效的

所以经常可以看到下面的写法

```js
module.exports = exports = {
  // 你想要导出的东西
}
```

## 解析与缓存
node本身将 `<path>: info` 的解构缓存在 `module.constructor._cache`里，即所有依赖处理完毕后，各自的依赖图都是固定的结构，如下。

```bash
{
  '/Users/manfredhu/Documents/manfredhu-some-exercise/src/commonjs/index.cjs': Module {
    id: '.',
    path: '/Users/manfredhu/Documents/manfredhu-some-exercise/src/commonjs',
    exports: {},
    parent: null,
    filename: '/Users/manfredhu/Documents/manfredhu-some-exercise/src/commonjs/index.cjs',
    loaded: false,
    children: [ [Module], [Module] ],
    paths: [
      '/Users/manfredhu/Documents/manfredhu-some-exercise/src/commonjs/node_modules',
      '/Users/manfredhu/Documents/manfredhu-some-exercise/src/node_modules',
      '/Users/manfredhu/Documents/manfredhu-some-exercise/node_modules',
      '/Users/manfredhu/Documents/node_modules',
      '/Users/manfredhu/node_modules',
      '/Users/node_modules',
      '/node_modules'
    ]
  },
  '/Users/manfredhu/Documents/manfredhu-some-exercise/src/commonjs/a.cjs': Module {
    id: '/Users/manfredhu/Documents/manfredhu-some-exercise/src/commonjs/a.cjs',
    path: '/Users/manfredhu/Documents/manfredhu-some-exercise/src/commonjs',
    exports: {},
    parent: Module {
      id: '.',
      path: '/Users/manfredhu/Documents/manfredhu-some-exercise/src/commonjs',
      exports: {},
      parent: null,
      filename: '/Users/manfredhu/Documents/manfredhu-some-exercise/src/commonjs/index.cjs',
      loaded: false,
      children: [Array],
      paths: [Array]
    },
    filename: '/Users/manfredhu/Documents/manfredhu-some-exercise/src/commonjs/a.cjs',
    loaded: true,
    children: [],
    paths: [
      '/Users/manfredhu/Documents/manfredhu-some-exercise/src/commonjs/node_modules',
      '/Users/manfredhu/Documents/manfredhu-some-exercise/src/node_modules',
      '/Users/manfredhu/Documents/manfredhu-some-exercise/node_modules',
      '/Users/manfredhu/Documents/node_modules',
      '/Users/manfredhu/node_modules',
      '/Users/node_modules',
      '/node_modules'
    ]
  },
  '/Users/manfredhu/Documents/manfredhu-some-exercise/src/commonjs/b.cjs': Module {
    id: '/Users/manfredhu/Documents/manfredhu-some-exercise/src/commonjs/b.cjs',
    path: '/Users/manfredhu/Documents/manfredhu-some-exercise/src/commonjs',
    exports: { b: 1 },
    parent: Module {
      id: '.',
      path: '/Users/manfredhu/Documents/manfredhu-some-exercise/src/commonjs',
      exports: {},
      parent: null,
      filename: '/Users/manfredhu/Documents/manfredhu-some-exercise/src/commonjs/index.cjs',
      loaded: false,
      children: [Array],
      paths: [Array]
    },
    filename: '/Users/manfredhu/Documents/manfredhu-some-exercise/src/commonjs/b.cjs',
    loaded: true,
    children: [],
    paths: [
      '/Users/manfredhu/Documents/manfredhu-some-exercise/src/commonjs/node_modules',
      '/Users/manfredhu/Documents/manfredhu-some-exercise/src/node_modules',
      '/Users/manfredhu/Documents/manfredhu-some-exercise/node_modules',
      '/Users/manfredhu/Documents/node_modules',
      '/Users/manfredhu/node_modules',
      '/Users/node_modules',
      '/node_modules'
    ]
  }
}
```