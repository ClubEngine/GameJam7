Network = {
	connect: function () {
		this.socket = io.connect('http://localhost:8080');

		this.socket.on('gst', function (state) {
			MainMenu.setState(state);
		});
	},

	setMap: function (mapName) {
		this.socket.emit('map:set', {
			'id': mapName
		});
	},

	setPlayer: function (playerID) {
		this.socket.emit('player:set', {
			'id': playerID
		});
	},

	getID: function () {
		return this.socket.socket.sessionid;
	},
}

Network.connect();
