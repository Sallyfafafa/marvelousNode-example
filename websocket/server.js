const express  = require("express");
const ws  = require("ws");

var app = express();
app.use(express.static('src'));
var wss = new ws.Server({port: 8080});

wss.on('connection', function connection(ws){
    console.log('server: receive connection.');
    
    ws.on('message', function incoming(message) {
        console.log('server: received: %s', message);
        ws.send('word message');
    });

    ws.on('close', function(){
        console.log('server: closed');
    })
    ws.send('word');
})

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/src/index.html');
});
  
app.listen(3000);
