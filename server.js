var SERVER_PORT = 8080;

var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

server.listen(SERVER_PORT);

app.use(express.static(__dirname));

io.sockets.on('connection', function (socket) {
	
	socket.broadcast.emit('status', { 
		'msg': 'new connection'
	});
	
	socket.emit('status', {
		'msg': 'connected'
	});

	socket.on('my other event', function (data) {
		console.log(data);
	});
});