$(document).ready(function () {
	SoundManager.init();
//	playSouth();
//	playNorth();
//	playEast();
//	playWest();
//	playYes();
//	playNo();
//	SoundManager.play('Bordel');
//	SoundManager.play('Wurst');

	var lab = labyrinthFactory("test");	

	var push_date = Date.now();
	var ball_date = Date.now();
	var anim_date = Date.now();
	var action = {};
	action.state = Action.IDLE;
	
	// tableau de joueur
	var players = new Array;
	var indexPlayer = 0;

	// player 1
	var player1 = new Player();
	insertActor(player1,1, 0);
	insertActor(player1, 9, 2);
	player1.setNumberAction(20);

	// acteur selectionne
	var actor = player1.currentActor();

	var entities = new Array();
	for (var i in player1.actors()) {
	    entities.push(player1.actors()[i]);
	}
	/*for (var i in player2) {
	    entities.push(player2[i]);
	}*/

	
	createTable(2 , 8, entities);
	// spawn monsters
	var freeCases = new Array();
	for(var x=0 ; x<lab.getWidth() ; ++x) {
		for(var y=0 ; y<lab.getHeight() ; ++y) {
			if(!lab.isObstacle(x,y)) {
				freeCases.push(new Array(x,y));
			}
		}
	}
	
	for(var nb=0;nb < 10;++nb) {
		var id = Math.floor(Math.random()*freeCases.length % freeCases.length);
		var monster = new Actor();
		monster.setSpriteId(11);
		monster.setPosition(freeCases[id][0], freeCases[id][1]);
		entities.push(monster);
		freeCases = delTabElement(freeCases, freeCases[id]);
	}
	// end spawn monsters


	var graphics = new Graphics(startGame);
	
	function focusPlayer() {
	    window.scrollTo((actor.getPosition().x-5)*32, (actor.getPosition().y-5)*32);
	}

	function startGame () {
		graphics.setLabyrinth(lab);
		focusPlayer();

		initKdConf(action);	
		kd.run(function () {
			kd.tick();
			actor.printCarac();

		// prevent  actor to move super quickly	
		if (action.state != Action.IDLE) {
			if (Date.now() > push_date + 150) {
				push_date = Date.now();
				
				
				if (action.state == Action.CHANGE_PLAYER_L) {
						actor=player1.previousActor();
				    	focusPlayer();
				} else if (action.state == Action.CHANGE_PLAYER_R) {
				    	actor=player1.nextActor();
						focusPlayer();
				} else if (action.state == Action.END_TURN) {
					
				}
				
				else {
					var mov = doMovement(actor, lab, action.state, entities);
					if (mov == 0) {
						//playPas();
						focusPlayer();
					} else if (mov == 1) {
				    	printMessage('Aïe.', false);
					} else {
				    		// mov est l'entitée attaquée
				    		printMessage('I KILLED YOU, BITCH !', true);
						var other_actor = mov;
						entities = delTabElement(entities,other_actor);
						actor.setNombreAction(0);
					}
				}				

				actor.printCarac();
	
				/*if (action.state >= Action.FIRE_U && action.state <= Action.FIRE_L) {
					ball = new Actor();
					ball.setPosition(actor.getPosition().x, actor.getPosition().y);
					ball.setSpriteId(SpriteCode.FIRE_BALL);
					ball.setDirection(action.state);
					entities.push(ball);
					playBall();
				}*/
			}
		}

		// Move fire balls
		if (Date.now() > ball_date + 100) {
                        ball_date = Date.now();
                        
                        newEntities = entities.slice();
                        for (var i in entities) {
                                if(entities[i].getSpriteId() == SpriteCode.FIRE_BALL){
                                        var ball = entities[i];
                                        toRm = doMovementFireBall(ball, lab, ball.getDirection());
                                        if (!toRm) {
                                                for (var j in entities) {
                                                        if (i!=j) {
                                                                tmp_other = entities[j];
                                                                if (ball.getPosition().x == tmp_other.getPosition().x &&
                                                                        ball.getPosition().y == tmp_other.getPosition().y) {
                                                                        newEntities = delTabElement(newEntities, tmp_other);    
                                                                        toRm = true;
                                                                }
                                                        }
                                                }
                                        }       
                                        if (toRm) {
                                                newEntities = delTabElement(newEntities, ball);
						                        playDepop();
                                        }

				} 
                        }
                        entities = newEntities;
                }

		// Anim monsters. Move to a neighbour case randomly.
		/*if (Date.now() > anim_date + 1000) {		
			anim_date = Date.now();
			for (var i in entities) {
				if (entities[i].getSpriteId() == SpriteCode.MONSTER1) {
					var rdir = Math.floor(Math.random()*4);
				console.log(rdir);
					var vdir = new Vector(0, 0);
					switch(rdir) {
						case 0:
							vdir.x = 1;
							break;
						case 1:
							vdir.x = -1;
							break;
						case 2:
							vdir.y = 1;
							break;
						case 3:
							vdir.y = -1;
							break;
					}
					var cpos = entities[i].getPosition();
		
					if(!lab.isObstacle(cpos.x+vdir.x, cpos.y+vdir.y)) {
						entities[i].setPosition(cpos.x+vdir.x, cpos.y+vdir.y);	
					}
				}
			}
		}*/		

		graphics.refreshAll(entities,actor);
		});	
	}
});


function playPas()
{
	SoundManager.play("Pas");
}
function playBall()
{
	SoundManager.play("Ball");
}
function playDepop()
{
	SoundManager.play("Depop");
}
function playNorth()
{
	i=Math.floor((Math.random()*100)%7)+1;
	SoundManager.play('North'+i);


}
function playSouth()
{
	i=Math.floor((Math.random()*100)%7)+1;
	SoundManager.play('South'+i);

}

function playEast()
{
	i=Math.floor((Math.random()*100)%4)+1;
	SoundManager.play('East'+i);

}


function playWest()
{
	i=Math.floor((Math.random()*100)%3)+1;
	SoundManager.play('West'+i);

}


function playYes()
{
	i=Math.floor((Math.random()*100)%5)+1;
	SoundManager.play('Yes'+i);
}

function playNo()
{
	i=Math.floor((Math.random()*100)%6)+1;
	SoundManager.play('No'+i);
}
function playRNorth()
{
	i=Math.floor((Math.random()*100)%7)+1;
	SoundManager.play('RNorth'+i);


}
function playRSouth()
{
	i=Math.floor((Math.random()*100)%7)+1;
	SoundManager.play('RSouth'+i);

}

function playREast()
{
	i=Math.floor((Math.random()*100)%4)+1;
	SoundManager.play('REast'+i);

}


function playRWest()
{
	i=Math.floor((Math.random()*100)%3)+1;
	SoundManager.play('RWest'+i);

}


function playRYes()
{
	i=Math.floor((Math.random()*100)%5)+1;
	SoundManager.play('RYes'+i);
}

function playRNo()
{
	i=Math.floor((Math.random()*100)%6)+1;
	SoundManager.play('RNo'+i);
}


// insert un actor dans le tableau avec sprite et tout le bordel
function insertActor(player, x, y) {
	// variable static
	if ( typeof insertActor.id == 'undefined' ) {
        insertActor.id = 1;
    }

	actor = new Actor();
	player.setActor(actor);
	actor.setSpriteId(insertActor.id);
	actor.setPosition(x, y);

	insertActor.id++;
}
function createTable(x, y, entities) {
	var table = new Actor();
	table.setSpriteId(99);
	table.setPosition(x,y);
	entities.push(table);
}
	
	


