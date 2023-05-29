# 这个例子尝试说明
body元素可以部分出现在image元素上面, 部分出现在image元素下面. image元素成了夹心饼干

![](../img/capture-1.jpg)

浏览器在绘制的时候, 总是先计算元素内容, 再渲染可替换元素内容. 所以body的图片才会出现在image元素的上面.

而如果body元素形成BFC,则元素不在同一个层叠上下文中, body元素整个元素出现在image元素的上面而不是部分可替换元素出现.

![](../img/capture-2.png)

## 可替换元素
Replaced Elements（可替换元素）：在HTML和CSS中，可替换元素是一种元素，其外观和尺寸由外部内容决定的。例如，<img>，<input>，<textarea>，<canvas>，<iframe>等等都是可替换元素。这些元素的内容由外部来源（例如图片URL或用户输入）决定。

## 层叠上下文
在CSS中，堆叠上下文是HTML元素的三维概念，这个概念有助于确定在页面上的元素如何覆盖其他元素。创建新的堆叠上下文的属性包括但不限于：position (非static)，z-index (非auto)，opacity (小于1)，transform，filter (非none)等等。