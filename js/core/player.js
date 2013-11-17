var Player = function () {
	this.tabActor = new Array;
	this.indexActor = 0;

}

Player.prototype = {
	actors: function (){
		return this.tabActor;
	},
	
	setActors: function(tab) {
		this.tabActor = tab;
	
	},

	addActor: function (a) {
		this.tabActor.push(a);
	},
	
	currentActor: function() {
		if (this.tabActor.length > 0) {
			return this.tabActor[this.indexActor];
		}	
		return null;
	},

	setCurrentActor: function(a) {
		for (i=0; i<this.tabActor.length; i++) {
			if (this.tabActor[i] == a){
				this.indexActor = i;
			}
		}	
		
	},	
	
	// decale l'acteur et retourne l'acteur courant
	nextActor: function() {
	   if (this.tabActor.length > 0) {
		   this.indexActor=(this.indexActor+1)%this.tabActor.length;
		   return this.tabActor[this.indexActor];	
	   }
	   return null;
	},

	// decale l'acteur et retourne l'acteur courant
	previousActor: function() {
		if (this.tabActor.length > 0) {
		   this.indexActor=(this.indexActor+1)%this.tabActor.length;
			return this.tabActor[this.indexActor];	
		}
		return null;
	},

	setNumberAction: function(n) {
		for (i=0; i<this.tabActor.length; i++) {
			this.tabActor[i].setNombreAction(n);
			this.tabActor[i].incrPV();
		}
	}
}
