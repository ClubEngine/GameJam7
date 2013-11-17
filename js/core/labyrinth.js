// Labyrinth 
// contains a board of case

// Constructor
// param width(int)
// param height(int)
var Labyrinth = function(width, height) {
	this.width = parseInt(width);
	this.height = parseInt(height);
	this.data = new Array();
	for(var x=0;x<width;++x) {
		this.data[x] = new Array();	
		for(var y=0;y<height;++y)
			this.data[x][y] = CaseCode.UNDEFINED;
	}
}

Labyrinth.prototype = {

	// Get the Width
	// return (int)
	getWidth: function() {
		return this.width;
	},
	// Get the Height
	// return (int)
	getHeight: function() {
		return this.height;
	},


	// Get the case code at the coo x y
	// return (int) Case code (see Case enum)
	get: function(x,y) {
		if (x >= this.width || y >= this.height || x < 0 || y < 0) {
			return CaseCode.UNDEFINED;
		} else {
			c = this.data[x][y];
			return (typeof(c)=='undefined') ? CaseCode.UNDEFINED : c;
		}
	},

	// Get the physic collision of the case at the coo x y
	// return (bool) True if the object is an obstacle, else False
	isObstacle: function(x,y) {
		var c = this.get(x,y);
		return c == CaseCode.WALL || c == CaseCode.UNDEFINED;
	},

	
	// Set the case code into the coo x y
	set: function(x,y,code) {
		this.data[x][y] = code;		
	}

}
