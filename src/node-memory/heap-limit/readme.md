# new-space
new-space.js 用以测试单机Node最大内存分配容量,我的电脑32G内存,但是只有约4G = 4 * 1024 * 1024 * 1024B最大使用

报错信息大致含义为4.09G附近进程崩溃原因是新生代执行Scavenge GC后还无法申请到内存空间, 自打开始marking标记开始,每1.5ms标记一次,标记到453ms后崩溃

最后报错信息为: 新生代晋升失败,申请内存空间失败,JS堆内存不足

Process: heapTotal 4.07GB heapUsed 4.06GB rss 4.09GB
------------------------------------------------

<--- Last few GCs --->

[62673:0x108008000]     3911 ms: Scavenge 4002.1 (4036.0) -> 4002.0 (4036.0) MB, 6.3 / 0.0 ms  (average mu = 1.000, current mu = 1.000) allocation failure
[62673:0x108008000]     4364 ms: Mark-sweep (reduce) 4082.1 (4116.0) -> 4082.0 (4115.3) MB, 374.0 / 0.0 ms  (+ 1.5 ms in 1 steps since start of marking, biggest step 1.5 ms, walltime since start of marking 453 ms) (average mu = 0.389, current mu = 0.389)

<--- JS stacktrace --->

FATAL ERROR: MarkCompactCollector: young object promotion failed Allocation failed - JavaScript heap out of memory


# old-space
new-space.js 用来测试老生代的部分,同样也是到4G左右崩溃

区别在这里setInterval了40ms,留给new-space GC时间,所以存量内存回收都在老生代



Heap allocated 4.01 GB

<--- Last few GCs --->

[63061:0x108008000]    18169 ms: Mark-sweep (reduce) 4103.8 (4107.3) -> 4103.8 (4108.3) MB, 224.7 / 0.0 ms  (average mu = 0.316, current mu = 0.000) last resort GC in old space requested
[63061:0x108008000]    18394 ms: Mark-sweep (reduce) 4103.8 (4107.3) -> 4103.7 (4108.3) MB, 224.6 / 0.0 ms  (average mu = 0.195, current mu = 0.000) last resort GC in old space requested


<--- JS stacktrace --->

FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory