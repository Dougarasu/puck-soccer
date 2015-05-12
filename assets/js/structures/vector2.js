define(function () {
	var cosRY, sinRY, proto;

	Vector2Const = {
		TO_DEGREES : 180 / Math.PI,
		TO_RADIANS : Math.PI / 180,
		temp : makeNewVector
	};

	function makeNewVector (x, y) {
		var vec = Object.create(proto);
		vec.x = x || 0;
		vec.y = y || 0;
		return vec;
	}

	var proto = {
		toString: function (decPlaces) {
			decPlaces = decPlaces || 3;
			var scalar = Math.pow(10,decPlaces);
			return "[" + Math.round (this.x * scalar) / scalar + ", " + Math.round (this.y * scalar) / scalar + "]";
		},
		copyFrom: function (v) {
			this.x = v.x;
			this.y = v.y;
		},
		magnitude: function () {
			return Math.sqrt((this.x * this.x) + (this.y * this.y));
		},
		magnitudeSquared: function () {
			return (this.x * this.x) + (this.y * this.y);
		},
		normalize: function () {
			var m = this.magnitude();
			this.x = this.x / m;
			this.y = this.y / m;
			return this;
		},
		reverse: function () {
			this.x = -this.x;
			this.y = -this.y;
			return this;
		},
		plusMe: function (v) {
			this.x += v.x;
			this.y += v.y;
			return this;
		},
		plus: function (v) {
			return new Vector2(this.x + v.x, this.y + v.y);
		},
		minusMe: function (v) {
			this.x -= v.x;
			this.y -= v.y;
			return this;
		},
		minus: function (v) {
			return new Vector2(this.x - v.x, this.y - v.y);
		},
		multiplyMe: function (scalar) {
			this.x *= scalar;
			this.y *= scalar;
			return this;
		},
		multiply: function (scalar) {
			var returnvec = this.clone();
			return returnvec.multiplyEq(scalar);
		},
		divideMe: function (scalar) {
			this.x /= scalar;
			this.y /= scalar;
			return this;
		},
		divide: function (scalar) {
			var returnvec = this.clone();
			return returnvec.divideEq(scalar);
		},
		dot: function (v) {
			return (this.x * v.x) + (this.y * v.y);
		},
		angle: function (useRadians) {
			return Math.atan2(this.y, this.x) * (useRadians ? 1 : Vector2Const.TO_DEGREES);
		},
		rotate: function (angle, useRadians) {
			var cosRY = Math.cos(angle * (useRadians ? 1 : Vector2Const.TO_RADIANS));
			var sinRY = Math.sin(angle * (useRadians ? 1 : Vector2Const.TO_RADIANS));
			Vector2Const.temp.copyFrom(this);
			this.x = (Vector2Const.temp.x * cosRY) - (Vector2Const.temp.y * sinRY);
			this.y = (Vector2Const.temp.x * sinRY) + (Vector2Const.temp.y * cosRY);
			return this;
		},
		equals: function (v) {
			return((this.x == v.x) && (this.y == v.x));
		},
		isCloseTo: function (v, tolerance) {
			if (this.equals(v)) {
				return true;
			}
			Vector2Const.temp.copyFrom(this);
			Vector2Const.temp.minusEq(v);
			return Vector2Const.temp.magnitudeSquared() < tolerance * tolerance;
		},
		rotateAroundPoint: function (point, angle, useRadians) {
			Vector2Const.temp.copyFrom(this);
			//trace("rotate around point "+t+" "+point+" " +angle);
			Vector2Const.temp.minusEq(point);
			//trace("after subtract "+t);
			Vector2Const.temp.rotate(angle, useRadians);
			//trace("after rotate "+t);
			Vector2Const.temp.plusEq(point);
			//trace("after add "+t);
			this.copyFrom(Vector2Const.temp);
		},
		isMagLessThan: function (distance) {
			return this.magnitudeSquared() < distance * distance;
		},
		isMagGreaterThan: function (distance) {
			return this.magnitudeSquared() > distance * distance;
		}
	};

	return {
		new: makeNewVector
	};
});