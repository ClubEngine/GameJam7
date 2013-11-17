function doMovementFireBall(actor, laby, action)
{
	var currentPos = actor.getPosition();
	var nextPos = new Vector(currentPos.x, currentPos.y);
	
	// change the new position
	switch (action)
	{
		case Action.FIRE_U:
			--nextPos.y;
			break;
	
		case Action.FIRE_D:
			++nextPos.y;
			break;
		
		case Action.FIRE_R:
			++nextPos.x;
			break;
		
		case Action.FIRE_L:
			--nextPos.x;
			break;
	}

	if (action != Action.IDLE) {
		actor.setDirection(action);
	}

	// test if the new position is not an bstacle
	if (! laby.isObstacle(nextPos.x, nextPos.y))
	{
		actor.setPosition(nextPos.x, nextPos.y);
	}

	return laby.isObstacle(nextPos.x, nextPos.y);
}

function doMovement(actor, laby, action, entities)
{
	var currentPos = actor.getPosition();
	var nextPos = new Vector(currentPos.x, currentPos.y);
	
	// change the new position
	switch (action)
	{
		case Action.UP:
			--nextPos.y;
			break;
	
		case Action.DOWN:
			++nextPos.y;
			break;
		
		case Action.RIGHT:
			++nextPos.x;
			break;
		
		case Action.LEFT:
			--nextPos.x;
			break;
	}

	if (action == Action.UP || action == Action.DOWN ||
		action == Action.LEFT || action == Action.RIGHT) {
		actor.setDirection(action);
	}

	// test if the new position is not an bstacle
	if (! laby.isObstacle(nextPos.x, nextPos.y))
	{
	    if (laby.entityOn(nextPos.x, nextPos.y, entities)) {
	        return 1;
	    } else {
	        actor.setPosition(nextPos.x, nextPos.y);
	        return 0;
	    }
	}
	return 2;
}
