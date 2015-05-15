define ([ "structures/puck", "settings", "structures/vector2" ], function (Puck, Settings, Vector2) {
	var potentialGoal = 0;

	function makeNewBall (id) {
		function superC () {};
		superC.prototype = Object.create(Puck.new(id));
		// 0: no goal
		// 1: player one
		// 2: player two
		superC.prototype.goal = 0;
		superC.prototype.move = function (deltaTime) {			
			if (this.velocity.magnitude() <= 0) {
				return;
			}
			
			potentialGoal = 0;

			// Increment location by velocity
			this.position.plusMe(this.velocity);

			// Field Right
			if (this.velocity.x > 0 && this.getCenterX() + this.radius > Settings.fieldWidth - Settings.fieldPaddingX + Settings.fieldOffsetX) {
				potentialGoal = 1;
				this.velocity.x = -Settings.ballSpeed * deltaTime;
			}
			// Field Left
			if (this.velocity.x < 0 && this.getCenterX() - this.radius < Settings.fieldPaddingX + Settings.fieldOffsetX) {
				potentialGoal = 2;
				this.velocity.x = Settings.ballSpeed * deltaTime;
			}
			// Field Bottom
			if (this.velocity.y > 0 && this.getCenterY() + this.radius > Settings.fieldHeight - Settings.fieldPaddingY + Settings.fieldOffsetY) {
				this.velocity.y = -Settings.ballSpeed * deltaTime;
			} 
			// Field Top
			if (this.velocity.y < 0 && this.getCenterY() - this.radius < Settings.fieldPaddingY + Settings.fieldOffsetY) {
				this.velocity.y = Settings.ballSpeed * deltaTime;
			}

			// If there is a potential goal, check the goal height conditions
			if (potentialGoal !== 0 && this.getCenterY() >= Settings.getGoalY() &&
				this.getCenterY() <= Settings.getGoalY() + Settings.getGoalHeight()) {
				this.goal = potentialGoal;
			}

			// Slow it down
			this.velocity.multiplyMe(Settings.ballDampening);
		};

		var myBall = new superC();
		myBall.size = Vector2.new(Settings.ballRadius, Settings.ballRadius);
		myBall.radius = myBall.size.x / 2;
		return myBall;
	}

	return {
		new: makeNewBall
	};
});