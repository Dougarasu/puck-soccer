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
			/*$(".screen.menu").show();
			$("#canvas").show();*/

			// Set the background in the
			this.changeScreen(ScreenId.menu);

			return true;
		},
		init: function (Game) {
			// Defines all the buttons of the game, according to its behavior
			var that = this;
			
			$("#btn-play").click(function() {
				//$(".profile0").attr("src", $(AssetLoader.imgs[ "profile0" ]).attr("src"));
				//$(".profile1").attr("src", $(AssetLoader.imgs[ "profile0" ]).attr("src"));
				that.changeScreen(ScreenId.addplayers);
			});
			
			$(".start-btn").click(function() {
				console.log($("#n-p1#focusedInput").html());
				$("#n-p1#focusedInput").html($("#name-p1").val());
				$("#n-p2").html($("#name-p2").val());	
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
		setScreenText: function (type, value) {
			$("#"+type).text(value);
		},
		setTimer: function (value) {
			$("#timer").html(value);
			$("#timer").attr("style", "width: " + ((value/Settings.turnCooldown) * 100) + "%");
		},
		setActive: function (id, show) {
			if (show) {
				$(id).removeClass("hidden");
			} else {
				console.log($(id));
				$(id).addClass("hidden");
			}
		} 
	};

	return makeNewInterface();
});