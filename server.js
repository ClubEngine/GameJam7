var SERVER_PORT = 8080,
	NB_PLAYERS_MAX = 4;

GST = {
	data: {
		map: -1,
		players: []
	},

	init: function (nbPlayersMax) {
		for (var iPlayer = 0; iPlayer < nbPlayersMax; ++iPlayer) {
			this.data.players.push(-1);
		}
	},

	emit: function (socket) {
		socket.emit('gst', this.data);
	},

	broadcast: function (socket) {
		socket.broadcast.emit('gst', this.data);
	},

	emitAndBroadcast: function (socket) {
		this.emit(socket);
		this.broadcast(socket);
	},

	isAvailable: function (playerID) {
		return (this.data.players[playerID] === -1);
	},

	setPlayer: function (playerID, socket) {
		var players = this.data.players;
		for (var iPlayer = 0; iPlayer < players.length; ++iPlayer) {
			if (players[iPlayer] === socket.id) {
				players[iPlayer] = -1;
			}
		}

		players[playerID] = socket.id;
		this.emitAndBroadcast(socket);
	},

	unsetPlayer: function (playerID, socket) {
		this.data.players[playerID] = -1;
		this.emitAndBroadcast(socket);
	},

	setMap: function (mapName, socket) {
		this.data.map = mapName;
		this.emitAndBroadcast(socket);
	},

	unsetMap: function (socket) {
		this.data.map = -1;
		this.emitAndBroadcast(socket);
	}
}

var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

server.listen(SERVER_PORT);
app.use(express.static(__dirname));

GST.init(NB_PLAYERS_MAX);

io.sockets.on('connection', function (socket) {
	GST.emit(socket);
	socket.pid = -1;

	socket.on('player:set', function (data) {
		if (GST.isAvailable(data.id)) {
			GST.setPlayer(data.id, socket);
			socket.pid = data.id;
		} else {
			console.log('player taken');
			GST.emit(socket);
		}
	});

	socket.on('player:unset', function (data) {
		GST.unsetPlayer(data.id, socket);
	});

	socket.on('map:set', function (data) {
		GST.setMap(data.id, socket);
	});

	socket.on('map:unset', function (data) {
		GST.unsetMap(data.id, socket);
	});

	socket.on('disconnect', function () {
		if (socket.pid !== -1) {
			GST.unsetPlayer(socket.pid, socket);
		}
	});
});