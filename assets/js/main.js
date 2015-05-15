/* global requirejs */
requirejs.config({
    // baseUrl: "app",
    urlArgs: "bust=" + (new Date()).getTime(), // Used to update the cached files when a page is open
	waitSeconds: 45,
	shim : {
        "bootstrap": { "deps": ["jquery"] }
    },
	paths: {
		jquery: "../lib/jquery-2.1.3.min",
		bootstrap: "../lib/bootstrap.min",
		lib: "../lib"
	}
});

requirejs([ "structures/game", "jquery", "core/navigation", "settings", "bootstrap" ],
	function (Game, $, Navigation, Settings, Input) {
	$(function() {
		// Twitter Bootstrap 3 carousel plugin
        $("#element").carousel();
        
		// TODO: later, a "Loading..." page can be implemented
		var loaded = Navigation.setup($, Settings);
		
		console.log("Navigation setup" + (loaded ? " " : "NOT ") + "initialized.");
		loaded = Game.init(Navigation.getGameFieldCanvas());
	});
});