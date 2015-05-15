/* global requirejs */
requirejs.config({
    // baseUrl: "app",
    urlArgs: "bust=" + (new Date()).getTime(), // Used to update the cached files when a page is open
	waitSeconds: 45,
	paths: {
		jquery: "../lib/jquery-2.1.3.min",
		//jquery: "https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js",
		lib: "../lib"
	}
});

requirejs([ "structures/game", "jquery", "core/navigation", "settings" ], function (Game, $, Navigation, Settings) {
	$(function() {
		// TODO: later, a "Loading..." page can be implemented
		var loaded = Navigation.setup($, Settings);
		console.log("Navigation setup" + (loaded ? " " : "NOT ") + "initialized.");
		loaded = Game.init(Navigation.getGameFieldCanvas());
	});
});

