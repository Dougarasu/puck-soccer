define([ "core/engine", "structures/match", "settings", "core/asset_loader", "core/navigation", "core/audio_center" ],
	function (Engine, Match, Settings, AssetLoader, Navigation, AudioCenter) {
	var i, j, myGame, myMatch = null, isPlaying = false, puck = {}, proto;

	function makeNewGame() {
		if (myGame == null) {
			myGame = Object.create(proto);
		}
		return myGame;
	}

	function addGoal(playerId) {
		//alert("Goooal! Congratz player " + (playerId+1));
		AudioCenter.playSfx("goal");
		myMatch.getPlayer(playerId).score += 1;
		Navigation.setScreenHtml("#score-p" + (playerId + 1), myMatch.getPlayer(playerId).score);

		// Check if the current player get the goals to win
		if (myMatch.getPlayer(playerId).score === Settings.winGoals) {
			AudioCenter.playSfx("match_end");
			alert("It is over! Player " + (playerId+1) + " is the WINNER!");
			myGame.stop();
		} else {
			myMatch.reset();
			// Reset the goal status in the 'ball' puck
			myMatch.pucks[ 10 ].goal = 0;
			myMatch.startTurn(playerId == 0);
		}
	}

	function update(deltaTime) {
		// Update general input
		myMatch.inputUpdate();
		// If any goal, then add to the corresponding player and 
		// Else, update all the collisions
		if (myMatch.pucks[ 10 ].goal != 0) {
			myMatch.endTurn(false, false);
			addGoal(myMatch.pucks[ 10 ].goal-1);
		} else {
			// Check collision withing each puck
			for (i = 0; i < myMatch.pucks.length; i += 1) {
				for (j = 0; j < myMatch.pucks.length; j += 1) {
					myMatch.pucks[ i ].collide(myMatch.pucks[ j ], deltaTime);
				}
			}
		}
		// Update position of pucks
		for (i = 0; i < myMatch.pucks.length; i += 1) {
			myMatch.pucks[ i ].move(deltaTime);
		}
	}

	function draw() {
		Navigation.setTimer(myMatch.getTimer());
		// Clean the field canvas
		Navigation.getContext().clearRect(0, 0, Settings.gameWidth, Settings.gameHeight);
		// Draw the field and the pucks
		drawField();
		
		/*// Helper to show mouse position
		if (myMatch != null) {
			Navigation.getContext().drawImage(AssetLoader.imgs[ "selected" ],
				myMatch.getMousePosition().x - 5, myMatch.getMousePosition().y - 5, 10, 10);
		}*/
	}

	function drawField() {
		// Draw the background field
		Navigation.getContext().drawImage(AssetLoader.imgs[ "field_bg" ], Settings.fieldOffsetX, Settings.fieldOffsetY, Settings.fieldWidth, Settings.fieldHeight);
		
		// Draw the ball
		myMatch.pucks[ 10 ].draw(Navigation.getContext());

		// Draw the selected puck
		myMatch.drawSelectedPuck(Navigation.getContext());
		
		// Draw the pucks
		for (i = 0; i < myMatch.pucks.length - 1; i += 1) {
			puck = myMatch.pucks[ i ];
			
			// Draw the selected effect below the current player pucks
			if (!myMatch.getInputPaused() &&
				(puck.id < 5 && myMatch.getCurrentPlayerId() === 0 || puck.id >= 5 && myMatch.getCurrentPlayerId() == 1)) {
				Navigation.getContext().drawImage(AssetLoader.imgs[ "selected" ], puck.position.x - 10, puck.position.y - 10,
					puck.size.x + 20, puck.size.y + 20);
			}

			puck.draw(Navigation.getContext());
		}

		// Draw the goals
		Navigation.getContext().drawImage(AssetLoader.imgs[ "goals" ], Settings.fieldOffsetX, Settings.fieldOffsetY, Settings.fieldWidth, Settings.fieldHeight);

		/*// Helper for the goal posts collider
		Navigation.getContext().fillStyle = "black";
		Navigation.getContext().fillRect(Settings.fieldOffsetX, Settings.getGoalY(), Settings.getGoalWidth(), Settings.getGoalHeight());*/
	}

	proto = {
		init: function (canvas) {
			Navigation.init(this);
			Engine.init(update, draw);
			//AudioCenter.playTheme("main_theme");
			return true;
		},
		start: function () {
			AudioCenter.stopTheme("main_theme");

			// Creates a new match
			if (myMatch === null) {
				myMatch = Match.new();
			}
			myMatch.init(canvas);

			Engine.play();

			Navigation.changeScreen(Navigation.ScreenId.ingame);
			myMatch.start(true);

			// Reset the scores to zero
			Navigation.setScreenHtml("#score-p1", 0);
			Navigation.setScreenHtml("#score-p2", 0);

			isPlaying = true;
			AudioCenter.playTheme("crowd");
			AudioCenter.playSfx("match_start");
		},
		stop: function () {
			AudioCenter.stopTheme("crowd");
			isPlaying = false;
			Engine.pause();
			myMatch.delete();
			Navigation.changeScreen(Navigation.ScreenId.menu);
			AudioCenter.playTheme("main_theme");
		}
	};
	return makeNewGame();
});