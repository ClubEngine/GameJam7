var Player = function () {
	this.tabActor = new Array;
	this.indexActor = 0;

}

Player.prototype = {
	actors: function (){
		return this.tabActor;
	},

	setActor: function (a) {
		this.tabActor[this.tabActor.length]=a;
	},
	
	currentActor: function() {
		if (this.tabActor.length > 0) {
			return this.tabActor[this.indexActor];
		}	
		return null;
	},
	
	// decale l'acteur et retourne l'acteur courant
	nextActor: function() {
		if (this.tabActor.length > 0) {
			if (this.indexActor < this.tabActor.length -1) {
				this.indexActor++;
			}	
			return this.tabActor[this.indexActor];	
		}
		return null;
	},
	
	// decale l'acteur et retourne l'acteur courant
	previousActor: function() {
		if (this.tabActor.length > 0) {
			if (this.indexActor > 0) {
				this.indexActor--;
			}	
			return this.tabActor[this.indexActor];	
		}
		return null;
	},

	setNumberAction: function(n) {
		for (i=0; i<this.tabActor.length; i++) {
			this.tabActor[i].setNombreAction(n);
		}
	}

}
