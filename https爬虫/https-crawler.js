const querystring = require('querystring');
const https = require('https');
const fs = require('fs');

var postData = querystring.stringify({
    'SiteId': 15,
    'Date': '2019/02/23 00:00:00'
});

var options = {
    hostname: 'pxapi.icaile.com',
    port: 443,
    path: '/api/LotteryResults/GetLotteryResultsBySiteIdDate',
    method: 'POST',
    headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        // 'Content-Length': postData.length,
        // ':authority': 'pxapi.icaile.com',
        // ':method': 'POST',
        // ':path': '/api/LotteryResults/GetLotteryResultsBySiteIdDate',
        // ':scheme': 'https',
        // 'accept': 'application/json, text/javascript, */*; q=0.01',
        // 'accept-encoding': 'gzip, deflate, br',
        // 'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7',
        'content-length': postData.length,
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'origin': 'https://pub.icaile.com',
        'referer': 'https://pub.icaile.com/xj11x5/',
        // 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
    }
};
let time = 0;
var req = https.request(options, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    let chunks = [];

    res.on('data', (d) => {
        // process.stdout.setEncoding('utf8');
        // process.stdout.write(d);
        chunks.push(d)
        time++;
        console.log(`time is ${time}`)
        
    });

    res.on('end', function() {
        console.log(chunks)
        fs.writeFile('log.txt', chunks, err => {
            if(err) console.log(err)
            else console.log('爬取成功！！')
        })
	})
});

req.on('error', (e) => {
    console.error(e);
});

req.write(postData);
req.end();