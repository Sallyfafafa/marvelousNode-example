time = function(opts) {
    var time = opts.time || 100; // 超时阈值

    return function(req, res, next) {
        var timer = setTimeout(function (){
            console.log('\033[90m%s %s\033[39m \033[91mis taking too long!\033[39m', req.method, req.url);
        }, time)
        res.on('data', function(chunk){})
        var end = res.end; // 保持对原函数的引用
        res.end = function(chunk, encoding) {
            res.end = end; // 恢复原始函数
            res.end(chunk, encoding); // 调用它
            clearTimeout(timer); // 最后清除定时器
        };
        next();
    }
}
module.exports = time;
