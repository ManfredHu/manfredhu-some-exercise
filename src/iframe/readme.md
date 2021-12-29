# 模拟一个w3school运行代码实时预览
点击运行，右侧展示结果

# 原理
左侧一个编辑器，编辑后点击运行时提交包含左侧代码的POST请求。服务器原封不动decodeURIComponent返回`ctx.set("Content-Type", "text/html; Charset=utf-8"); // 返回html `形式的数据，左侧iframe直接展示

这个时候你一定奇怪，原封不动返回的内容，为什么会在“查看结果”区域（即iframe里面）执行出效果来？重点来了，请注意<form>标签上有个属性target="i"，而<iframe>标签上也有一个属性叫做name="i"，他们两个属性都叫做字母“i”，可不是作者瞎写的。这个的意思是说，将form表单提交，返回的结果提交到以target的值为name的窗口中。关于form表单的target值，可以参考这里：http://www.w3school.com.cn/tags/att_form_target.asp 。这就解释了为什么返回的内容可以在iframe里面展示出来了。由于iframe的隔离性，你不管提交什么代码，都只能影响到iframe里面的区域，不会影响到页面上其他部分。


来源： https://www.cnblogs.com/xuning/p/7992388.html


# startup
```bash
node src/iframe/node.js
```