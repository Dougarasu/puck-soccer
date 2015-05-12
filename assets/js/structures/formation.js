define(["structures/vector2", "settings"], function (Vector2, Settings) {
	var proto, myFormation, halfFieldWidth, fieldHeight, formations;

	function makeNewPosition(xPerc, yPerc, leftSide) {
		return Vector2.new(
			(leftSide ? xPerc * halfFieldWidth - Settings.puckRadius / 2 :
				(1 - xPerc) * halfFieldWidth + halfFieldWidth - Settings.puckRadius / 2) + Settings.fieldOffsetX,
			yPerc * fieldHeight - Settings.puckRadius / 2 + Settings.fieldOffsetY);
	}

	function createFormation(positions, leftSide) {
		var formation = [], i;
		for (i = 0; i < positions.length; i += 1) {
			formation.push(makeNewPosition(positions[ i ][ 0 ], positions[ i ][ 1 ], leftSide));
		}
		return formation;
	}

	function makeNewFormation() {
		if (myFormation == null) {
			myFormation = Object.create(proto);
		}
		return myFormation;
	}

	formations = {
		"202-a": function (leftSide) {
			return createFormation([ [ 0.6, 0.4 ], [ 0.6, 0.6 ], [ 0.5, 0.2 ], [ 0.5, 0.8 ], [ 0.2, 0.5 ] ], leftSide);
		},
		"211-a": function (leftSide) {
			return createFormation([ [ 0.6, 0.5 ], [ 0.4, 0.5 ], [ 0.3, 0.2 ], [ 0.2, 0.8 ], [ 0.2, 0.5 ] ], leftSide);
		},
		"112-a": function (leftSide) {
			return createFormation([ [ 0.85, 0.3 ], [ 0.85, 0.7 ], [ 0.6, 0.5 ], [ 0.35, 0.5 ], [ 0.2, 0.5 ] ], leftSide);
		},
		"cascade": function (leftSide) {
			return createFormation([ [ 0.8, 0.2 ], [ 0.7, 0.3 ], [ 0.6, 0.4 ], [ 0.5, 0.5 ], [ 0.4, 0.6 ] ], leftSide);
		}
	}

	proto = {
		init: function (halfWidth, fullHeight) {
			halfFieldWidth = halfWidth;
			fieldHeight = fullHeight;
		},
		getFormation: function (name, leftSide) {
			return formations[ name ](leftSide);
		}
	};

	return makeNewFormation();
});