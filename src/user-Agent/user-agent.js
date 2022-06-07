var client = function() {
    //浏览器引擎
    var engine = {
        trident: 0,     //IE的内核
        gecko:   0,     //Firefox对应的内核
        presto:  0,     //opera12.17前的内核
        webkit:  0,     //Chrome,Safari的内核(Blink在Webkit上精简了)
        khtml:   0,     //konqueror浏览器的内核

        ver:     null   //内核版本号
    };

    //浏览器
    var broser = {
        ie:         0,      //IE6-11
        firefox:    0,      //火狐
        opera:      0,      //欧朋，包括换了内核后的
        chrome:     0,      //谷歌
        safari:     0,      //苹果
        konqueror:  0,      //征服者
        eage:       0,      //win10的Eage

        ver:        null
    };

    //操作系统
    var system = {
        win；    false,  //windows
        mac:     false,  //mac
        x11：    false,  //Linux&Unix

        iphone:  false,
        ipod:    false,
        ipad:    false,
        ios:     false,
        android: false,
        nokiaN:  false,
        winMobile:false
    };

    var ua = navigator.userAgent; //获取UA字符串
}();
