$(document).ready(function () {
	SoundManager.init();

	Labyrintic.init($('#game'));
	MainMenu.init($('#main-menu'), Labyrintic);
	MainMenu.show();

	Network.connect();
});


//= Sound management
// @TODO: should be moved to the SoundManager
function playPas () {
	SoundManager.play("Pas");
}

function playBall () {
	SoundManager.play("Ball");
}

function playDepop () {
	SoundManager.play("Depop");
}

function playNorth () {
	i = Math.floor((Math.random() * 100) % 7) + 1;
	SoundManager.play('North' + i);
}

function playSouth () {
	i = Math.floor((Math.random() * 100) % 7) + 1;
	SoundManager.play('South' + i);
}

function playEast () {
	i = Math.floor((Math.random() * 100) % 4) + 1;
	SoundManager.play('East' + i);
}

function playWest () {
	i = Math.floor((Math.random() * 100) % 3) + 1;
	SoundManager.play('West' + i);
}

function playYes () {
	i = Math.floor((Math.random() * 100) % 5) + 1;
	SoundManager.play('Yes' + i);
}

function playNo () {
	i = Math.floor((Math.random() * 100) % 6) + 1;
	SoundManager.play('No' + i);
}

function playRNorth () {
	i = Math.floor((Math.random() * 100) % 7) + 1;
	SoundManager.play('RNorth' + i);
}

function playRSouth () {
	i = Math.floor((Math.random() * 100) % 7) + 1;
	SoundManager.play('RSouth' + i);
}

function playREast () {
	i = Math.floor((Math.random() * 100) % 4) + 1;
	SoundManager.play('REast' + i);
}

function playRWest () {
	i = Math.floor((Math.random() * 100) % 3) + 1;
	SoundManager.play('RWest' + i);
}

function playRYes () {
	i = Math.floor((Math.random() * 100) % 5) + 1;
	SoundManager.play('RYes' + i);
}

function playRNo () {
	i = Math.floor((Math.random() * 100) % 6) + 1;
	SoundManager.play('RNo' + i);
}