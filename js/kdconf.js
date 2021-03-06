function initKdConf(action) {

	kd.UP.up(function() {
		action.state  = Action.IDLE;
	});

	kd.UP.down(function() {
		action.state  = Action.UP;
	});

	kd.DOWN.up(function() {
		action.state  = Action.IDLE;
	});

	kd.DOWN.down(function() {
		action.state  = Action.DOWN;
	});

	kd.RIGHT.up(function() {
		action.state = Action.IDLE;
	});

	kd.RIGHT.down(function() {
		action.state = Action.RIGHT;
	});

	kd.LEFT.up(function() {
		action.state  = Action.IDLE;
	});

	kd.LEFT.down(function() {
		action.state  = Action.LEFT;
	});



	
	kd.Z.up(function() {
		action.state  = Action.IDLE;
	});

	kd.Z.down(function() {
		action.state  = Action.FIRE_U;
	});
	
	kd.D.up(function() {
		action.state  = Action.IDLE;
	});

	kd.D.down(function() {
		action.state  = Action.FIRE_R;
	});
	
	kd.S.up(function() {
		action.state  = Action.IDLE;
	});

	kd.S.down(function() {
		action.state  = Action.FIRE_D;
	});
	
	kd.Q.up(function() {
		action.state  = Action.IDLE;
	});

	kd.Q.down(function() {
		action.state  = Action.FIRE_L;
	});
	
	kd.E.up(function() {
		action.state  = Action.IDLE;
	});

	kd.E.down(function() {
		action.state  = Action.END_TURN;
	});
	
	
	
	kd.W.up(function() {
		action.state  = Action.IDLE;
	});

	kd.W.down(function() {
		action.state  = Action.CHANGE_PLAYER_L;
	});
	
	kd.X.up(function() {
		action.state  = Action.IDLE;
	});

	kd.X.down(function() {
		action.state  = Action.CHANGE_PLAYER_R;
	});
    kd.ENTER.up(function() {
        action.state = Action.IDLE;
    });

    kd.ENTER.down(function() {
        action.state = Action.END_TURN;
    });
}

