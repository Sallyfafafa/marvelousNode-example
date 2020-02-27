var qs = require('querystring');
require('http').createServer(function(req, res){
  var body = '';
  req.on('data', function(chunk){
    body += chunk;
  });
  req.on('end', function(){
      res.writeHead(200);
      res.end('done', qs.parse(body).name);
      console.log('body', qs.parse(body));
      console.log('we got: \033[96m' + qs.parse(body).name + '\033[39m \n');
  });
}).listen(3000);
