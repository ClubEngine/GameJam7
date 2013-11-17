Network = {
	connect: function () {
		this.socket = io.connect('http://localhost:8080');

		this.socket.on('status', function (data) {
			console.log(data);
		});
	}
}

Network.connect();
