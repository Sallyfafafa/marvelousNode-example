var connect = require('connect');
var server = connect.createServer();
server.use(connect.logger('dev'));

server.use(function(req, res, next){
    if('/' == req.url) {
        res.writeHead(200);
        res.end('fast!');
    } else {
        next();
    }
})
// server.use('/my', connect.static('/website'));

server.listen(3000);
