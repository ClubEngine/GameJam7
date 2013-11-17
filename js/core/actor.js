// Actor
// Moveable object

var Actor = function (isTable) {
	this.pos = new Vector(0,0);
	this.spriteId = 0;
	this.dir = Action.DOWN;
	this.nombreAction = 1;
	this.PV = 1 ;
	this.Attack = 1 ;
	this.table = isTable;
}

Actor.prototype = {
	getPosition: function () {
		return this.pos;
	},

	setPosition: function (x,y) {	
		if (this.nombreAction > 0) {	
			this.pos.x = x;
			this.pos.y = y;
			--this.nombreAction;
		}
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
		return this.nombreAction;
	},
	setPV: function (n) {
		this.PV = n;
	},

	getPV: function (n) {
		return this.PV;
	},
	setAttack: function (n) {
		this.Attack = n;
	},

	getAttack: function (n) {
		return this.Attack;
	},
	
	printCarac: function () {
	    printCarac("Actions restantes : <b>"+this.nombreAction+"</b><br />PVs : <b>"+this.PV+"</b><br />Attaque : <b>"+this.Attack+'</b>');
	},
}
