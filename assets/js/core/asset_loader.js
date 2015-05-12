/* global Audio */
/* global Image */
define (function () {
	var proto, myLoader, assetsLoaded, numImgs, numAudios,
		imgsFolder = "assets/img/",
		audiosFolder = "assets/audio/";

	function makeNewAssetLoader() {
		if (myLoader == null) {
			myLoader = Object.create(proto);
			myLoader.init();
		}
		return myLoader;
	}

	function assetLoaded(dic, name) {
		// don't count assets that have already loaded
		if (myLoader[ dic ][ name ].status !== "loading" ) {
			return;
		}
		myLoader[ dic ][ name ].status = "loaded";
		console.log("Loaded " + name);
		assetsLoaded += 1;
		// finished callback
		if (assetsLoaded == myLoader.totalAssets) {
			console.log("foi");
		}
	}

	proto = {
		imgs: {
			"field_bg"		: imgsFolder + "fields/field_bg.jpg",
			"goals"			: imgsFolder + "goals.png",
			//"goal_post"		: imgsFolder + "goal_post.png",
			"selected"		: imgsFolder + "selected.png",
			"p1"			: imgsFolder + "profiles/brazil.png",
			"p2"			: imgsFolder + "profiles/poland.png",
			"ball"			: imgsFolder + "puck_ball.png",
			"menu_bg"		: imgsFolder + "menu_bg.jpg",
			"selected"		: imgsFolder + "selected.png",
			"dir_circle"	: imgsFolder + "direction_circle.png",
			"profile0"		: imgsFolder + "profiles/empty.jpg",
		},
		audios: {
			"puck_whoosh"	: audiosFolder + "puck_whoosh.ogg",
			"puck_hit"		: audiosFolder + "puck_hit.ogg",
			"ball_hit"		: audiosFolder + "ball_hit.ogg",
			"goal"			: audiosFolder + "goal.ogg",
			"match_start"	: audiosFolder + "match_start.ogg",
			"match_end"		: audiosFolder + "match_end.ogg",
			"crowd"			: audiosFolder + "crowd.ogg",
			"main_theme"	: audiosFolder + "main_theme.ogg",
		},
		totalAssest: numImgs + numAudios,
		init: function () {
			assetsLoaded = 0;
			numImgs = Object.keys(this.imgs).length;
			numAudios = Object.keys(this.audios).length;

			var _this = this, src, img, audio;
			// load images
			for (img in this.imgs) {
				if (this.imgs.hasOwnProperty(img)) {
					//console.log("Loading " + img);
					src = this.imgs[img];
					// create a closure for event binding
					(function (_this, img) {
						_this.imgs[ img ] = new Image();
						_this.imgs[ img ].status = "loading";
						_this.imgs[ img ].name = img;
						_this.imgs[ img ].onload = function () {
							assetLoaded.call(_this, "imgs", img);
						};
						_this.imgs[ img ].src = src;
					})(_this, img);
				}
			}

			// load audios
			for (audio in this.audios) {
				if (this.audios.hasOwnProperty(audio)) {
					//console.log("Loading " + audio);
					src = this.audios[audio];
					// create a closure for event binding
					(function (_this, audio) {
						_this.audios[ audio ] = new Audio();
						_this.audios[ audio ].status = "loading";
						_this.audios[ audio ].name = audio;
						_this.audios[ audio ].addEventListener("canplaythrough", function () {
							assetLoaded.call(_this, "audios", audio);
						});
						_this.audios[ audio ].src = src;
					})(_this, audio);
				}
			}
		}
	};
	return makeNewAssetLoader();
});