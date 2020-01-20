var net = require('net');
var server = net.createServer(function(conn){
	console.log('\033[90m new connection!! \033[0m');
})
server.listen(3000, function(){
	console.log('\033[96m server listening on *:3000 \033[0m');
})
