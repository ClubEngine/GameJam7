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
	
	var entities = new Array();
	
	// tableau de joueur
	var players = new Array;
	var indexPlayer = 0;

	// player 1
	var player1 = new Player();
	insertActor(player1, entities, 1, 0);
	insertActor(player1, entities, 9, 2);
	player1.setNumberAction(20);

	// player 2
	var player2 = new Player();
	insertActor(player2, entities, 1, 25);
	insertActor(player2, entities, 5, 25);
	player2.setNumberAction(20);

	players[0]=player1;
	players[1]=player2;

	// acteur selectionne
	var actor = players[0].currentActor();


	
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
			focusPlayer();

		// prevent  actor to move super quickly	
		if (action.state != Action.IDLE) {
			if (Date.now() > push_date + 150) {
				push_date = Date.now();
				
				
				if (action.state == Action.CHANGE_PLAYER_L) {
						actor=players[indexPlayer].previousActor();
				    	focusPlayer();
				} else if (action.state == Action.CHANGE_PLAYER_R) {
				    	actor=players[indexPlayer].nextActor();
						focusPlayer();
				} else if (action.state == Action.END_TURN) {
						indexPlayer = (indexPlayer + 1) % players.length;
						players[indexPlayer].setNumberAction(20);	
				    	actor=players[indexPlayer].currentActor();
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
						if (actor.getNombreAction() > 0) {
							actor.setNombreAction(0);
							if (mov.table) {
								printMessage('Glou glou glou.', true);
								var others = [];
								var addEntityToOther = function (x, y) {
									var character = lab.entityOn(x, y, entities, actor);
									if (character) {others.push(character)}
								}
								addEntityToOther(mov.pos.x-1, mov.pos.y);
								addEntityToOther(mov.pos.x, mov.pos.y-1);
								addEntityToOther(mov.pos.x+1, mov.pos.y);
								addEntityToOther(mov.pos.x, mov.pos.y+1);
								if (others.length == 0) {
									// Dédoublement
									var alreadyAdd = false;
									var execIfIsEmpty = function (x, y) {
										if (!alreadyAdd) {
											var character = lab.entityOn(x, y, entities);
											if (!character) {
												alreadyAdd = true;
												insertActor(players[indexPlayer], entities, x, y);
											}
										}
									}
									execIfIsEmpty(mov.pos.x-1, mov.pos.y);
									execIfIsEmpty(mov.pos.x, mov.pos.y-1);
									execIfIsEmpty(mov.pos.x+1, mov.pos.y);
									execIfIsEmpty(mov.pos.x, mov.pos.y+1);
								} else {
									// Fuuuuuusion
									entities = delTabElement(entities, others[0]);
									players[indexPlayer].setActors(delTabElement(players[indexPlayer].actors(), others[0]));
									players[indexPlayer].setCurrentActor(actor);
									// TODO stats
								}
							} else {
								printMessage('I KILLED YOU, BITCH !', true);
								var other_actor = mov;
								entities = delTabElement(entities,other_actor);
								for (i in players) {
									players[i].setActors(delTabElement(players[i].actors(), other_actor));
									if (i == indexPlayer){
										players[i].setCurrentActor(actor);
									}else{
										players[i].previousActor();
									}									
									
								}
							}
						}
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
function insertActor(player, entities, x, y) {
	// variable static
	if ( typeof insertActor.id == 'undefined' ) {
		insertActor.id = 1;
	}

	actor = new Actor();
	player.addActor(actor);
	actor.setSpriteId(insertActor.id);
	actor.setPosition(x, y);

	entities.push(actor);

	insertActor.id++;
	if (insertActor.id > 2) {
		insertActor.id = 1;
	}
}
function createTable(x, y, entities) {
	var table = new Actor(true);
	table.setSpriteId(99);
	table.setPosition(x,y);
	entities.push(table);
}




