/* global $ */
/* global document */
define([ "core/asset_loader", "settings" ], function (AssetLoader, Settings) {
	var myNavigation, canvas, el, canvasGameField, fieldContext, context,
		lastScreen = ScreenId, currentScreen = ScreenId, ScreenId, proto;

	ScreenId = {
		menu: 0,
		credits: 1,
		addplayers: 2,
		ingame: 3
	};

	function makeNewInterface() {
		if (myNavigation == null) {
			myNavigation = Object.create(proto);
			myNavigation.ScreenId = ScreenId;
		}
		return myNavigation;
	}

	function newButton(str) {
		return $("<input>").attr("type", "button").attr("value", str);
	}

	proto = {
		setup: function ($, Settings) {
			canvas = document.getElementById("canvas");
			canvas.width = Settings.gameWidth;
			canvas.height = Settings.gameHeight;

			el = $("canvas");
			context = canvas.getContext("2d");

			// Set the background in the
			this.changeScreen(ScreenId.menu);

			return true;
		},
		init: function (Game) {
			// Defines all the buttons of the game, according to its behavior
			var that = this;
			
			$("#btn-play").click(function() {
				// Reset all the index for the profile images
				$("#img-p1 .active").removeClass("active");
				$("#img-p2 .active").removeClass("active");
				
				$("#img-p1 .item #0").parent().addClass("active");
				$("#img-p2 .item #1").parent().addClass("active");
				
				// Reset all the names in the addplayers screen
				$("#n-p1").children(0).val("player1");
				$("#n-p2").children(0).val("player2");
				
				that.changeScreen(ScreenId.addplayers);
			});
			
			$(".start-btn").click(function() {
				// Set the data from the addplayers screen to the ingame screen
				$("#profile-p1").attr("src", $("#img-p1 .active").children(0).attr("src"));
				$("#profile-p2").attr("src", $("#img-p2 .active").children(0).attr("src"));
				
				$("#name-p1").html($("#n-p1").children(0).val());
				$("#name-p2").html($("#n-p2").children(0).val());
				
				Game.start();
			});
			
			$("#btn-credits").click(function() {
				that.changeScreen(ScreenId.credits);
			});
			
			$("#btn-back-credits").click(function() {
				that.changeScreen(ScreenId.menu);
			});
			
			$("#btn-back-addplayers").click(function() {
				that.changeScreen(ScreenId.menu);
			});
		},
		getProfileId: function (playerId) {
			return $("#img-p" + playerId + " .active").children(0).attr("id");
		},
		getGameFieldCanvas: function () {
			return canvas;
		},
		changeScreen: function (nextScreen) {
			var i;
			for (i = 0; i < Object.getOwnPropertyNames(ScreenId).length; i += 1) {
				$("#" + Object.getOwnPropertyNames(ScreenId)[ i ]).hide();
			}
			$("#" + Object.getOwnPropertyNames(ScreenId)[ nextScreen ]).show();
		},
		getContext: function () {
			return context;
		},
		setScreenHtml: function (type, value) {
			$(type).html(value);
		},
		setTimer: function (value) {
			$("#timer").html(value);
			$("#timer").attr("style", "width: " + ((value/Settings.turnCooldown) * 100) + "%");
		},
		setActive: function (id, show) {
			if (show) {
				$(id).removeClass("hidden");
			} else {
				$(id).addClass("hidden");
			}
		} 
	};

	return makeNewInterface();
});