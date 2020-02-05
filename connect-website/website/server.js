var http = require('http');
var fs = require('fs');

// 创建服务器
var server = http.createServer(function(req, res) {
    // 检查服务器目录是否与文件夹下目录匹配
    if('GET' == req.method && '/images' == req.url.substr(0,7)) {
        fs.stat(__dirname + req.url, function (err, stat) {
            console.log('err:',err);
            if (err || !stat.isFile()) {
                //请求错误时的Status Code
              res.writeHead(404);
              res.end('Not Found');
              return;
            }
            // jpg类型的图片
            serve(__dirname + req.url, 'application/jpg');
        });
    } else if ('GET' == req.method && '/' == req.url) {
        // 入口配置
        serve(__dirname+'/index.html', 'text/html');
    } else {
        res.writeHead(404);
        res.end('Not Found!!~')
    }
    // 请求服务函数,告诉浏览器发送的资源类型
    function serve (path, type) {
        res.writeHead(200, { 'Content-Type': type });
        fs.createReadStream(path).pipe(res);
        // 这里的 createReadStream 会有另一种写法：
        // fs.createReadStream(path)
        // .on('data', function(){})
        // .end('data', function(){})
        // }
    }
});

// 监听3000端口
server.listen(3000);