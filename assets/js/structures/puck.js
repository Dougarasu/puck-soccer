define([ "structures/vector2", "settings", "core/asset_loader", "core/audio_center" ],
	function (Vector2, Settings, AssetLoader, AudioCenter) {
	var proto, d, u, dMag, hitId;

	function makeNewPuck (id) {
		var puck = Object.create(proto);
		puck.id = id;
		puck.position = Vector2.new();
		puck.velocity = Vector2.new();
		puck.name = (id >= 5 ? "p1" : "p2");
		puck.size = Vector2.new(Settings.puckRadius, Settings.puckRadius);
		puck.radius = puck.size.x / 2;
		return puck;
	}

	proto = {
		getCenterX: function () {
			return this.position.x + this.radius;
		},
		getCenterY: function () {
			return this.position.y + this.radius;
		},
		draw: function (context) {
			/*
			// Origin coordinate
			context.fillStyle = "black";
			context.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);*/
			
			/*
			context.beginPath();
			context.moveTo(this.getCenterX(), this.getCenterY());
			context.lineTo(this.getCenterX() + this.velocity.x + 50, this.getCenterY() + this.velocity.y + 50);
			context.stroke();
			*/
			
			context.drawImage(AssetLoader.imgs[ this.name ], this.position.x, this.position.y, this.size.x, this.size.y);			
			/*
			// Center coordinate
			context.fillStyle = "red";
			context.fillRect(this.getCenterX() - 2.5, this.getCenterY() - 2.5, 5, 5);*/
		},
		move: function (deltaTime) {
			if (this.velocity.magnitude() <= 0) {
				return;
			}
			// Increment location by velocity
			this.position.plusMe(this.velocity);

			if (this.velocity.x > 0 && this.getCenterX() >= Settings.fieldWidth - this.radius-Settings.fieldPaddingX + Settings.fieldOffsetX) {
				this.velocity.x = -this.velocity.x;
			}
			if (this.velocity.x < 0 && this.getCenterX() <= this.radius+Settings.fieldPaddingX + Settings.fieldOffsetX) {
				this.velocity.x = -this.velocity.x;
			}
			if (this.velocity.y > 0 && this.getCenterY() >= Settings.fieldHeight - this.radius - Settings.fieldPaddingY + Settings.fieldOffsetY) {
				this.velocity.y = -this.velocity.y;
			} 
			if (this.velocity.y < 0 && this.getCenterY() <= this.radius + Settings.fieldPaddingY + Settings.fieldOffsetY) {
				this.velocity.y = -this.velocity.y;
			}

			// Slow it down
			this.velocity.multiplyMe(Settings.puckDampening);
			//if (this.velocity.magnitude() < 0.05) this.velocity = Vector2.new(0, 0);
		},
		collide: function (other) {
			if (other !== this && this.velocity.magnitude() > 0.1) {
				// distance from `a` to `b`
				d = Vector2.new(other.getCenterX() - this.getCenterX(), other.getCenterY() - this.getCenterY());
				dMag = d.magnitude();
				
				// If the balls are on top of one another,
				if (dMag < this.radius + other.radius) {
					//console.log("Hit ID: " + this.id);
					// then execute a repulsive force to
					// push them apart, which resembles collision.
					u = Vector2.new(d.x, d.y).divideMe(dMag);
					//other.velocity.plusMe(u);
					other.velocity.x += u.x * Settings.repulsion;
					other.velocity.y += u.y * Settings.repulsion;
					//this.velocity.plusMe(this.velocity.minus(u));
					this.velocity.x -= u.x * Settings.repulsion;
					this.velocity.y -= u.y * Settings.repulsion;
					//this.velocity.plusMe(u.multiplyMe(-Settings.repulsion * this.radius));
					//other.velocity.plusMe(u.multiplyMe(-1));
					
					// Play sfx
					AudioCenter.playSfx("ball_hit");
				}
			}
		}
	};

	return {
		new: makeNewPuck
	};
});