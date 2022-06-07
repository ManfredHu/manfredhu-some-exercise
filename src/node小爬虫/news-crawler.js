var http = require('http')
var url = 'http://news.baidu.com/' //百度新闻

// 用get方法发送http请求，在data获取数据
// @param url http发起请求的url
// @param callback 回调函数，对返回的response进行处理
http.get(url, function(res) {
	var html = ''

	res.on('data', function(data) {
		html += data;
	})

	res.on('end', function() {
		console.log(html)
	})

}).on('error', function() {
	console.log('获取请求数据出错！')
});