
var Screen = function(callback) {
	this.map = document.getElementById('map');
  	this.context = this.map.getContext('2d');

	this.playersMap = document.getElementById('playersMap');
  	this.playersMapCxt = this.playersMap.getContext('2d');

	this.width = this.map.width;
	this.height = this.map.height;

	var nbSpritesLoading = 0, nbSpritesLoaded = 0;

	var spritesImg = {
		// Players
		'player13': 'assets/amg1_bk1.png',
		'player14': 'assets/amg1_fr1.png',
		'player12': 'assets/amg1_lf1.png',
		'player11': 'assets/amg1_rt1.png',
		'player23': 'assets/npc5_bk1.png',
		'player24': 'assets/npc5_fr1.png',
		'player22': 'assets/npc5_lf1.png',
		'player21': 'assets/npc5_rt1.png',

		// Monsters
		'monster13': 'assets/scr1_bk1.png',
		'monster14': 'assets/scr1_fr1.png',
		'monster12': 'assets/scr1_lf1.png',
		'monster11': 'assets/scr1_rt1.png',
		'monster23': 'assets/wmg1_bk1.png',
		'monster24': 'assets/wmg1_fr1.png',
		'monster22': 'assets/wmg1_lf1.png',
		'monster21': 'assets/wmg1_rt1.png',

		// Elements
		'fire': 'assets/conjure_ball_lightning.png',

		// Labyrinth
		'wall': 'assets/stone_brick12.png',
		'floor': 'assets/crystal_floor3.png',
		'arena': 'assets/rough_red0.png'
	}

	this.sprites = [];
	for (var spriteName in spritesImg) {
		nbSpritesLoading++;
		var sprite = new Image();
		sprite.onload = function () {
			nbSpritesLoaded++;

			if (nbSpritesLoaded === nbSpritesLoading) {
				nbSpritesLoaded = -Infinity;
				callback();
			}
		}
		sprite.src = spritesImg[spriteName];
		this.sprites[spriteName] = sprite;
	}
}
var screen;

Screen.prototype = {
	// x1, y1, x2, y2 : chiffres
	// color: "rga(0, 0, 255, 0.5)"
	printRect: function(x1, y1, w, h, color) {
  		this.context.fillStyle = color;
  		this.context.fillRect(x1, y1, w, h);
	},
	drawWall: function(x, y) {
		this.context.drawImage(this.sprites['wall'], x, y);
	},
	drawFloor: function(x, y) {
		this.context.drawImage(this.sprites['floor'], x, y);
	},
	drawArena: function(x, y) {
		this.context.drawImage(this.sprites['arena'], x, y);
	},
	drawPlayer: function (iPlayer, x, y, direction) {
		direction = direction || 1;
		this.playersMapCxt.drawImage(this.sprites['player' + iPlayer + direction.toString()], x, y);
	},
	drawMonster: function (iMonster, x, y, direction) {
		direction = direction || 1;
		this.playersMapCxt.drawImage(this.sprites['monster' + iMonster + direction.toString()], x, y);
	},
	drawFire: function(x, y) {
		this.playersMapCxt.drawImage(this.sprites['fire'], x, y);
	}
}
  
var MapGraphic = function (labyrinth) {
	this.labyrinth = labyrinth
}

MapGraphic.prototype = {
    print: function (origin_x, origin_y, visionScope) {
	// Parcours de la matrice et affichage d'un 
	// carré de couleur différente pour chaque nombre
	for (y = 0; y < this.labyrinth.getHeight(); y++ ) {
		for (x = 0; x < this.labyrinth.getWidth(); x++ ) {
			var type = parseInt(this.labyrinth.get(x, y));
			if (!this.is_visible(origin_x, origin_y, visionScope, x, y) || type == CaseCode.UNDEFINED) {
				screen.printRect(32*x,32*y,32,32, "rgba(255,0,0,1)");
			} else if (type == CaseCode.WALL) {
				screen.drawWall(32*x,32*y);
			} else if (type == CaseCode.GROUND) {
				screen.drawFloor(32*x,32*y);
			}
			
			  else if (type == CaseCode.ARENA) {
				screen.drawArena(32*x,32*y);
			}	
		}		
	}
	},
    
    is_visible: function (origin_x, origin_y, visionScope, x, y) {
    	var diff_x = x - origin_x;
    	var diff_y = y - origin_y;
    	return (diff_x < visionScope && diff_y < visionScope && diff_x > -visionScope && diff_y > -visionScope);
    }
}

var Graphics = function (callback) {
	this.mapGraphic = null;

	screen = new Screen(callback);
	screen.printRect(0, 0, screen.width, screen.height, "rgba(255, 255, 255, 0.5)");
}

Graphics.prototype = {
	setLabyrinth: function (labyrinth) {
		if (this.mapGraphic) {
			this.mapGraphic.setMatrix(labyrinth);
		} else {
			this.mapGraphic = new MapGraphic(labyrinth);
		}
		this.mapGraphic.print();
		this.mapGraphic.print(0, 0, 1024);
	},
	
	refreshAll: function(entities) {
	    screen.playersMapCxt.clearRect(0, 0, 736, 1024);

		for (var i in entities) {
			var entity = entities[i];
			var pos = entity.getPosition();
			var spriteId = entity.getSpriteId();

			if (spriteId == SpriteCode.PLAYER1) {
				screen.drawPlayer(1, 32 * pos.x, 32 * pos.y, entity.getDirection());
			} else if (spriteId == SpriteCode.PLAYER2) {
				screen.drawPlayer(2, 32 * pos.x, 32 * pos.y, entity.getDirection());
			} else if (spriteId == SpriteCode.MONSTER1) {
				screen.drawMonster(1, 32*pos.x,32*pos.y, entity.getDirection());
			} else if (spriteId == SpriteCode.MONSTER2) {
				screen.drawMonster(2, 32*pos.x,32*pos.y, entity.getDirection());
			} else if (spriteId == SpriteCode.FIRE_BALL) {
				screen.drawFire(32*pos.x, 32*pos.y);
			}

		}
	}
}




