// Actor
// Moveable object

var Actor = function () {
	this.pos = new Vector(0,0);
	this.spriteId = 0;
	this.dir = Action.DOWN;
	this.nombreAction = 0;
}

Actor.prototype = {
	getPosition: function () {
		return this.pos;
	},

	setPosition: function (x,y) {
		this.pos.x = x;
		this.pos.y = y;
		--this.nombreAction;
	},
	
	getDirection: function (dir) {
		return this.dir;
	},

	setDirection: function (dir) {
		this.dir = dir;
	},

	getSpriteId: function () {
		return this.spriteId;
	},
	
	setSpriteId: function(id) {
		this.spriteId = id;
	},

	setNombreAction: function (n) {
		this.nombreAction = n;
	},

	getNombreAction: function (n) {
		return nombreAction;
	}
}
