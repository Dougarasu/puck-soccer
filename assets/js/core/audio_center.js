define ([ "core/asset_loader" ], function (AssetLoader) {
	var myAudioCenter, proto;

	function makeNewAudioCenter() {
		if (myAudioCenter == null) {
			myAudioCenter = Object.create(proto);
		}
		return myAudioCenter;
	}

	proto = {
		playSfx: function (name) {
			AssetLoader.audios[ name ].play();
		},
		playTheme: function (name) {
			AssetLoader.audios[ name ].addEventListener("ended", function () {
				this.play();
			}, false);
			AssetLoader.audios[ name ].play();
		},
		pauseTheme: function (name) {
			AssetLoader.audios[ name ].pause();
		},
		stopTheme: function (name) {
			AssetLoader.audios[ name ].pause();
			AssetLoader.audios[ name ].currentTime = 0;
		}
	};

	return makeNewAudioCenter();
});