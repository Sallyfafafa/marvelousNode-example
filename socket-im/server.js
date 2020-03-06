var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/src/index.html');
})

io.on('connection', function(socket){
    console.log('get a connection');
    io.emit('hasConnect', '有人连接进来了');
    socket.on('disconnect', function(){ // 关闭连接触发
        io.emit('broadcast', '有人关闭连接');
    });
    socket.on('chat message', function(msg){ // 收到客户端的消息
        console.log('get massage:', msg);
    });
    socket.on('sendMsg', function(msg, id){
        console.log(msg, id);
        io.emit('receiveMsg', msg, id);
    })
    socket.on('chat another', function(msg){ // 收到客户端的消息
        io.emit('chat another', 'this is a message to everybody'); // 在发给客户端
    });
})

http.listen(3000, function(){ // 监听端口
    console.log('listen on : 3000');
})
