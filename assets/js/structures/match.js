define([ "structures/puck", "structures/vector2", "settings", "structures/player", "structures/formation", "structures/ball", "core/asset_loader", "core/audio_center", "core/navigation" ],
	function (Puck, Vector2, Settings, Player, Formation, Ball, AssetLoader, AudioCenter, Navigation) {
	var i, proto, players = [], mouseDown = false, mouseUp = false, mouseX, mouseY, canv, mag, inputPaused = false,
		playerOneTurn = true, turnTimer, timerValue = 0,
		minIndex = 0, maxIndex = 10,
		puckSelected = -1, selectedPos = Vector2.new(), selectedSize = 0;

	function makeNewMatch() {
		var match = Object.create(proto);
		match.distanceSelected = Vector2.new();
		return match;
	}
	
	function getMousePos (canvas, evt) {
		var rect = canvas.getBoundingClientRect();
		return {
			x: evt.clientX - rect.left,
			y: evt.clientY - rect.top
		};
	}
	
	proto = {
		getInputPaused: function () {
			return inputPaused;
		},
		pucks: [],
		start: function (playerOne, p0Info, p1Info) {
			this.startTurn(playerOne);
		},
		endTurn: function (changePlayer, loop) {
			puckSelected = -1;
			mouseDown = false;
			mouseUp = true;
			clearInterval(turnTimer);
			//console.log("player " + (playerOneTurn?"one":"two") + " end turn");
			if (loop){
				this.startTurn(changePlayer ? !playerOneTurn : playerOneTurn);
			}
		},
		startTurn: function (playerOne) {
			var that = this;
			
			timerValue = Settings.turnCooldown;
			
			// Show the corresponding turn-indicator
			Navigation.setActive("#bar-p" + (playerOneTurn ? 1 : 2), false);
			playerOneTurn = playerOne;
			Navigation.setActive("#bar-p" + (playerOneTurn ? 1 : 2), true);
			
			turnTimer = setInterval((function() {
				return function () {
					// Check if the turn time is over for the current playing player
					if (timerValue <= 0) {
						that.endTurn(true, true);
					}
					//console.log("player " + (playerOneTurn?"one":"two") + " is playing");
					timerValue -= 1;
				}
			}()), 1000);
		},
		init: function(canvas) {
			// Hide all the turn-indicators
			Navigation.setActive("#bar-p1", false);
			Navigation.setActive("#bar-p2", false);
			
			Formation.init(Settings.fieldWidth / 2.0, Settings.fieldHeight);
			var i, that = this;
			// Creates pucks for Player1
			for (i = 0; i < 5; i += 1) {
				this.pucks.push(Puck.new(i));
			}
			// Creates pucks for Player2
			for (i = 5; i < 10; i += 1) {
				this.pucks.push(Puck.new(i));
			}
			// Creates the ball
			this.pucks.push(Ball.new(11));

			// Create Players
			players.push(Player.new("211-a"));
			players.push(Player.new("202-a"));

			// Positions the game elements
			this.reset();

			// Create input state
			canvas.addEventListener("mousedown", function (e) {
				mouseDown = true;
				mouseUp = false;
				mouseX = getMousePos(this, e).x;
				mouseY = getMousePos(this, e).y;
			});
			canvas.addEventListener("mouseup", function (e) {
				mouseDown = false;
				mouseUp = true;
			});
			canvas.addEventListener("mousemove", function (e) {
				mouseX = getMousePos(this, e).x;
				mouseY = getMousePos(this, e).y;
				
				// Get the distance vector if selected puck
				if (puckSelected !== -1) {
					that.distanceSelected.x = that.pucks[ puckSelected ].getCenterX() - mouseX;
					that.distanceSelected.y = that.pucks[ puckSelected ].getCenterY() - mouseY;
				}
			});

			console.log("Current match initialized.");
		},
		inputUpdate: function (deltaTime) {
			// If input is paused, then check if all the pucks, including the ball, have velocity.magnitude() == 0
			// Else execute the input normally
			if (inputPaused) {
				for (i = 0; i < this.pucks.length; i += 1) {
					if (this.pucks[ i ].velocity.magnitude() > 0.05) {
						break;
					}
				}
				if (i === 11) {
					inputPaused = false;
					this.endTurn(true, true);
				}
			} else {
				if (mouseDown) {
					puckSelected = -1;
					
					// Check which player is playing
					if (!Settings.godMode) {
						minIndex = playerOneTurn ? 0 : 5;
						maxIndex = playerOneTurn ? 5 : 10;
					}

					for (i = minIndex; i < maxIndex; i += 1) {
						// Check if the corresponding player hit one puck
						if (Vector2.new(this.pucks[i].getCenterX() - mouseX, this.pucks[ i ].getCenterY() - mouseY).magnitude() <
							this.pucks[ i ].radius + this.pucks[ 10 ].radius) {
							puckSelected = i;
							mouseDown = false;
							this.distanceSelected.x = this.pucks[ puckSelected ].getCenterX() - mouseX;
							this.distanceSelected.y = this.pucks[ puckSelected ].getCenterY() - mouseY;
							// Draw the 
							break;
						}
					}
				} else if (mouseUp && puckSelected !== -1) {
					AudioCenter.playSfx("puck_whoosh");

					this.pucks[ puckSelected ].velocity =
						Vector2.new(this.pucks[ puckSelected ].getCenterX() - mouseX, this.pucks[ puckSelected ].getCenterY() - mouseY);
					mag = this.pucks[ puckSelected ].velocity.magnitude() / Settings.maxDirectionalSize;
					this.pucks[ puckSelected ].velocity.normalize().multiplyMe((Math.abs(mag) > 0.5 ? 1 : mag*2) * Settings.pullStrength);
					puckSelected = -1;
					inputPaused = true;
					this.endTurn(false, false);
				}
			}
		},
		getSelectedPuck: function () {
			return puckSelected != -1 ? this.pucks[ puckSelected ] : null;
		},
		reset: function () {
			// Positions Player1 pucks
			for (i = 0; i < 5; i += 1) {
				this.pucks[ i ].velocity = Vector2.new();
				this.pucks[ i ].position = Formation.getFormation(this.getPlayer(0).formation, true)[ i ];
			}
			// Positions Player2 pucks
			for (i = 5; i < 10; i += 1) {
				this.pucks[ i ].velocity = Vector2.new();
				this.pucks[ i ].position = Formation.getFormation(this.getPlayer(1).formation, false)[ i - 5 ];
			}
			// Positions the ball
			this.pucks[ 10 ].velocity = Vector2.new();
			this.pucks[ 10 ].position = Vector2.new(Settings.fieldWidth / 2 - this.pucks[ 10 ].radius + Settings.fieldOffsetX,
				Settings.fieldHeight / 2 - this.pucks[ 10 ].radius + Settings.fieldOffsetY);

		},
		getPlayer: function (id) {
			return players[ id ];
		},
		drawSelectedPuck: function (context) {
			if (this.getSelectedPuck() != null) {
				selectedSize = (this.getSelectedPuck().radius + 30) * this.distanceSelected.magnitude() / this.getSelectedPuck().radius;
				selectedSize = selectedSize > Settings.maxDirectionalSize ? Settings.maxDirectionalSize : selectedSize;
				selectedPos.x = this.getSelectedPuck().getCenterX() - selectedSize / 2;
				selectedPos.y = this.getSelectedPuck().getCenterY() - selectedSize / 2;

				var translateX = selectedPos.x + (selectedSize / 2);
				var translateY = selectedPos.y + (selectedSize / 2);

				context.save();
				context.translate(translateX, translateY);
				context.rotate(this.distanceSelected.angle(true));
				context.translate(-translateX, -translateY);
				// Draw the direction circle/arrow
				context.drawImage(AssetLoader.imgs[ "dir_circle" ], selectedPos.x, selectedPos.y, selectedSize, selectedSize);
				context.restore();
			}
		},
		getTimer: function () {
			return timerValue;
		},
		getCurrentPlayerId: function () {
			return playerOneTurn ? 0 : 1; 
		},
		delete: function () {
			for (i = 0; i < 11; i += 1) {
				delete this.pucks[ i ];
			}
			this.pucks = [];
			delete players[0];
			delete players[1];
			players = [];
		},
		getMousePosition: function () {
			return {
				x: mouseX,
				y: mouseY
			};
		}
	};

	return {
		new: makeNewMatch
	};
});