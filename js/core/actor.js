// Actor
// Moveable object

var Actor = function (isTable,ismonster) {
	this.pos = new Vector(0,0);
	this.spriteId = 0;
	this.dir = Action.DOWN;
	this.nombreAction = 1;
	this.PV = 1 ;
	this.Attack = 1 ;
	this.maxPV = 1;
	this.table = isTable;
	this.monster = ismonster;
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
		if (this.PV > this.maxPV) {
		    this.maxPV = this.PV;
		}
	},

	getPV: function () {
		return this.PV;
	},
	setAttack: function (n) {
		this.Attack = n;
	},
	incrPV: function (n) {
	    this.PV += Math.floor(this.maxPV/10);
	    if (this.PV > this.maxPV) {
	        this.PV = this.maxPV;
	    }
	},

	getAttack: function () {
		return this.Attack;
	},
	
	printCarac: function () {
	    printCarac("Actions restantes : <b>"+this.nombreAction+"</b><br />PVs : <b>"+this.PV+"</b>/<b>"+this.maxPV+"</b><br />Attaque : <b>"+this.Attack+'</b>');
	},
}
