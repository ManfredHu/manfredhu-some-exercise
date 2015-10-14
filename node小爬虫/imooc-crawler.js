var http = require('http')
var url = 'http://www.imooc.com/learn/348'

// get方法
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

}).on('error' ,function() {
	console.log('获取请求数据出错！')
})
