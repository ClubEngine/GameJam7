SoundManager = {
	init: function () {
		if (!createjs.Sound.initializeDefaultPlugins()) { return; }
	
		var audioPath = "assets/sounds/";
		var manifest = [
		{
			id: "South1",
			src: "south/south_english_1.ogg"
		},
		{
			id: "South2",
			src: "south/south_english_2.ogg"
		},
		{
			id: "South3",
			src: "south/south_english_3.ogg"
		},
		{
			id: "South4",
			src: "south/south_english_4.ogg"
		},
		{
			id: "South5",
			src: "south/south_english_5.ogg"
		},
		{
			id: "South6",
			src: "south/south_english_6.ogg"
		},
		{
			id: "South7",
			src: "south/south_english_7.ogg"
		},
		{
			id: "North1",
			src: "north/north_english_1.ogg"
		},
		{
			id: "North2",
			src: "north/north_english_2.ogg"
		},
		{
			id: "North3",
			src: "north/north_english_3.ogg"
		},
		{
			id: "North4",
			src: "north/north_english_4.ogg"
		},
		{
			id: "North5",
			src: "north/north_english_5.ogg"
		},
		{
			id: "North6",
			src: "north/north_english_6.ogg"
		},
		{
			id: "North7",
			src: "north/north_english_7.ogg"
		},
		{
			id: "East1",
			src: "east/east_english_1.ogg"
		},
		{
			id: "East2",
			src: "east/east_english_2.ogg"
		},
		{
			id: "East3",
			src: "east/east_english_3.ogg"
		},
		{
			id: "East4",
			src: "east/east_english_4.ogg"
		},
		{
			id: "West1",
			src: "west/west_english_1.ogg"
		},
		{
			id: "West2",
			src: "west/west_english_2.ogg"
		},
		{
			id: "West3",
			src: "west/west_english_3.ogg"
		},
		{
			id: "Yes1",
			src: "yes/yes_english_1.ogg"
		},
		{
			id: "Yes2",
			src: "yes/yes_english_2.ogg"
		},
		{		
			id: "Yes3",
			src: "yes/yes_english_3.ogg"
		},
		{
			id: "Yes4",
			src: "yes/yes_english_4.ogg"
		},
		{
			id: "Yes5",
			src: "yes/yes_english_5.ogg"
		},
		{
			id: "No1",
			src: "no/no_english_1.ogg"
		},
		{
			id: "No2",
			src: "no/no_english_2.ogg"
		},
		{
			id: "No3",
			src: "no/no_english_3.ogg"
		},
		{
			id: "No4",
			src: "no/no_english_4.ogg"
		},
		{
			id: "No5",
			src: "no/no_english_5.ogg"
		},
		{
			id: "No6",
			src: "no/no_english_6.ogg"
		},
		{
			id: "Wurst",
			src: "wurst.ogg"
		},
		{
			id: "Bordel",
			src: "bordel.ogg"
		},
		{
			id: "RSouth1",
			src: "south/reverse/south_english_1.ogg"
		},
		{
			id: "RSouth2",
			src: "south/reverse/south_english_2.ogg"
		},
		{
			id: "RSouth3",
			src: "south/reverse/south_english_3.ogg"
		},
		{
			id: "RSouth4",
			src: "south/reverse/south_english_4.ogg"
		},
		{
			id: "RSouth5",
			src: "south/reverse/south_english_5.ogg"
		},
		{
			id: "RSouth6",
			src: "south/reverse/south_english_6.ogg"
		},
		{
			id: "RSouth7",
			src: "south/reverse/south_english_7.ogg"
		},
		{
			id: "RNorth1",
			src: "north/reverse/north_english_1.ogg"
		},
		{
			id: "RNorth2",
			src: "north/reverse/north_english_2.ogg"
		},
		{
			id: "RNorth3",
			src: "north/reverse/north_english_3.ogg"
		},
		{
			id: "RNorth4",
			src: "north/reverse/north_english_4.ogg"
		},
		{
			id: "RNorth5",
			src: "north/reverse/north_english_5.ogg"
		},
		{
			id: "RNorth6",
			src: "north/reverse/north_english_6.ogg"
		},
		{
			id: "RNorth7",
			src: "north/reverse/north_english_7.ogg"
		},
		{
			id: "REast1",
			src: "east/reverse/east_english_1.ogg"
		},
		{
			id: "REast2",
			src: "east/reverse/east_english_2.ogg"
		},
		{
			id: "REast3",
			src: "east/reverse/east_english_3.ogg"
		},
		{
			id: "REast4",
			src: "east/reverse/east_english_4.ogg"
		},
		{
			id: "RWest1",
			src: "west/reverse/west_english_1.ogg"
		},
		{
			id: "RWest2",
			src: "west/reverse/west_english_2.ogg"
		},
		{
			id: "RWest3",
			src: "west/reverse/west_english_3.ogg"
		},
		{
			id: "RYes1",
			src: "yes/reverse/yes_english_1.ogg"
		},
		{
			id: "RYes2",
			src: "yes/reverse/yes_english_2.ogg"
		},
		{		
			id: "RYes3",
			src: "yes/reverse/yes_english_3.ogg"
		},
		{
			id: "RYes4",
			src: "yes/reverse/yes_english_4.ogg"
		},
		{
			id: "RYes5",
			src: "yes/reverse/yes_english_5.ogg"
		},
		{
			id: "RNo1",
			src: "no/reverse/no_english_1.ogg"
		},
		{
			id: "RNo2",
			src: "no/reverse/no_english_2.ogg"
		},
		{
			id: "RNo3",
			src: "no/reverse/no_english_3.ogg"
		},
		{
			id: "RNo4",
			src: "no/reverse/no_english_4.ogg"
		},
		{
			id: "RNo5",
			src: "no/reverse/no_english_5.ogg"
		},
		{
			id: "RNo6",
			src: "no/reverse/no_english_6.ogg"
		},
		{	
			id: "Ball",
			src: "samples/ball.ogg"	
		},
		{
			id: "Depop",
			src: "samples/depop.ogg"
		},
		{
			id: "Pas",
			src: "samples/pas.ogg"
		}
		];
	
		createjs.Sound.registerManifest(manifest, audioPath);
	},
	
    play: function (soundName) {
		createjs.Sound.play(soundName);
	}
}
