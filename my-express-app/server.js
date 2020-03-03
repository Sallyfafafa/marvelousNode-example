var express = require('express');
var app = express();
var port = 3000;
// 路由方面
app.get('/', function(req, res, next){ res.send('<p>hello world</p>'); next()});
app.get('/user', (req, res, next)=>{ res.send('user用户'); next()});
app.get('/user/:id', (req, res) =>{ res.send(res.params)}); // 动态路由
app.get('/put', (req, res)=>{ res.send('<p>you get a put</p>')});

// 静态文件
app.use(express.static('images'));  // 默认/下加载images目录中的资源
app.use('/image', express.static('images'));  // 在/image目录加载images目录中的资源

app.listen(port, ()=>{
    console.log(`app is listening at ${port}`);
})