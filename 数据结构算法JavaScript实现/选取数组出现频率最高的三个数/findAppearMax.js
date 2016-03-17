;
(function() {
    function Arr(oneArr) {
        this.value = oneArr;
    }
    var testArr = [1, 23, 3, 4, 6, 10, 2, 1, 1, 8, 8, 9, 2, 4, 1, 24, 0];

    //统计数组头三个出现频率最高的字符
    //初始化对象,对象结构如下
    //obj{
    //  a:1,
    //  b:23,
    //  c:12
    //}
    Arr.prototype.initObj = function() {
        var arr = this.value;
        var countObj = {};
        for (var i = 0; i < arr.length; i++) {
            countObj[arr[i]] ? countObj[arr[i]]++ : (countObj[arr[i]] = 1);
        }
        this.countObj = countObj;
        return this;
    };

    Arr.prototype.findAppearMax = function(count) {

        if (typeof count !== "number") {
            throw new Error("testArr.findAppearMax():count TypeError");
        }
        if (!this || typeof this.countObj !== 'object') {
            throw new Error("testArr.findAppearMax():not this or initObj countObj error");
        }

        //存this.countObj最大的几个值
        var temp = [],
            //存this.countObj最大的几个值的次数
            tempCount = [],
            max = null, //key
            maxNum = 0, //value
            isFirst = true, //标识是否为第一值
            i;

        //找出对象的前几个
        for (i = 0; i < count; i++) {
            isFirst = true;
            for (var a in this.countObj) {
                //刚开始为true
                if (isFirst) {
                    max = a; //存储键
                    maxNum = this.countObj[a]; //存储值
                    isFirst = false;
                } else {
                    if (this.countObj[a] > maxNum) {
                        max = a;
                        maxNum = this.countObj[a]; //存储值
                    }
                }

            }
            temp[i] = max;
            tempCount[i] = maxNum;
            delete this.countObj[max];
        }
        this.resultArr = temp;
        this.resultCount = tempCount;
        return this;
    };

    //查找出现频率最高的三个
    //初始化对象
    var result = new Arr(testArr);
    //输出构造的计数对象
    console.log(result.initObj());
    console.log(result.initObj().findAppearMax(3));
    console.log(result.resultArr) //[1,2,4]为数组出现的最多的三个数字
    console.log(result.resultCount) //[4,2,2]为出现的频率

})();
