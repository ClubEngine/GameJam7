var LabyrinthFactory = {
	parseFromDOM: function (id, callback) {
		callback(this._parse($('#' + id).html()));
	},

	parseFromFile: function (filename, callback) {
		var self = this;
		$.get(filename, function (data) {
			callback(self._parse(data));
		});
	},

	_parse: function (content) {
		var firstNewline = content.substring(1).indexOf('\n'),
			params = content.substring(0, firstNewline+1).split(' '),
			width = params[0],
			height = params[1],

		content = content.substring(firstNewline+2);

		var labyrinth = new Labyrinth(width, height);
		
		for (var iRow = 0; iRow < height; ++iRow) {
			for (var iCol = 0; iCol < width; ++iCol) {
				labyrinth.set(iCol, iRow, content.substring(iCol, iCol + 1));
			}

			content = content.substring(content.indexOf('\n') + 1);
		}
	 	
		return labyrinth;
	}
}