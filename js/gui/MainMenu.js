var MainMenu = {
	init: function ($elem, labyrintic) {
		this.$elem = $elem;
		this.game = labyrintic;

		var self = this;
		this.$elem.on('click', 'li', function () {
			var $selected = $(this);

			if ($selected.data('map') !== undefined) {
				Network.setMap($selected.data('map'));
			} else if ($selected.data('pid') !== undefined) {
				Network.setPlayer($selected.data('pid'));
			}
		});

		$('#start-game').attr('disabled', 'disabled');

		this.$elem.on('click', '#start-game', function () {
			self.hide();
			self.game.show();
			self.game.start(self.state.map);
		});
	},

	setState: function (state) {
		this.state = state;
		this.$elem.find('li').removeClass('active connected');

		var map = this.$elem
			.find('li[data-map="' + state.map + '"]')
			.addClass('active');

		var players = state.players, hasSelectedPlayer = false;
		for (var iPlayer = 0; iPlayer < players.length; ++iPlayer) {
			if (players[iPlayer] !== -1) {
				var playerTypeClass = 'connected';
				if (players[iPlayer] === Network.getID()) {
					playerTypeClass = 'active';
					hasSelectedPlayer = true;
				}

				this.$elem.find('li[data-pid="' + iPlayer + '"]')
					.addClass(playerTypeClass);
			}
		}

		// activate start button
		if (map.length >= 1 && hasSelectedPlayer) {
			$('#start-game').removeAttr('disabled');
		}
	},

	show: function () {
		this.$elem.show();
	},

	hide: function () {
		this.$elem.hide();
	}
}