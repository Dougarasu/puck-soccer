define(function () {
	var proto;

	function makeNewPlayer (formation) {
		var player = Object.create(proto);
		player.score = 0;
		player.formation = formation;
		return player;
	}

	proto = {
		score: 0,
		formation: "",
		name: "",
		profile: ""
	};

	return {
		new: makeNewPlayer
	};
});