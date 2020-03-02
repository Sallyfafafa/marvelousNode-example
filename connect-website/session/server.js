/**
 * Module dependencies
 */

var connect = require('connect')
  , users = require('./user')

/**
 * Create server
 */

var server = connect(
    connect.logger('dev')
  , connect.bodyParser()
  , connect.cookieParser()
  , connect.session({ secret: 'my app secret' })
  , function (req, res, next) {
      if ('/' == req.url && req.session.logged_in) { // 首先判断当前用户是否已经登录
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(
            'Welcome back, <b>' + req.session.name + '</b>. '
          + '<a href="/logout">Logout</a>'
        );
      } else {
        next();
      }
    }
  , function (req, res, next) {
      if ('/' == req.url && 'GET' == req.method) { // 没登录则出表单，进行登录
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end([
            '<form action="/login" method="POST">'
          ,   '<fieldset>'
          ,     '<legend>Please log in</legend>'
          ,     '<p>User: <input type="text" name="user"></p>'
          ,     '<p>Password: <input type="password" name="password"></p>'
          ,     '<button>Submit</button>'
          ,   '</fieldset>'
          , '</form>'
        ].join('')); // 表单会通过post提交至/login页
      } else {
        next();
      }
    }
  , function (req, res, next) {
      if ('/login' == req.url && 'POST' == req.method) {
        res.writeHead(200);
        // 登录成功，判断用户账号密码是否正确，不正确则
        if (!users[req.body.user] || req.body.password != users[req.body.user].password) {
          res.end('Bad username/password');
        } else { // 密码正确
          req.session.logged_in = true;
          req.session.name = users[req.body.user].name;
          res.end('Authenticated!');
        }
      } else {
        next();
      }
    }
  , function (req, res, next) {
      // 登出页去清除登录状态
      if ('/logout' == req.url) {
        req.session.logged_in = false;
        res.writeHead(200);
        res.end('Logged out!');
      } else {
        next();
      }
    }
);

/**
 * Listen.
 */

server.listen(3000);
