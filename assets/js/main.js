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

requirejs([ "structures/game", "jquery", "core/navigation", "settings", "core/input", "bootstrap" ],
	function (Game, $, Navigation, Settings, Input) {
	$(function() {
		// Add browser check 
		if (!$.browser) {
			$.browser = {};
			$.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
			$.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
			$.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
			$.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
		}
		// If it is a mobile OR it isn't Mozilla browser, then show the "Not supported" screen
		if (Input.isMobile.any() != null || !$.browser.mozilla) {
			Navigation.changeScreen(Navigation.ScreenId.notSupported);
		} else {
			Navigation.changeScreen(Navigation.ScreenId.menu);
			// Twitter Bootstrap 3 carousel plugin
	        $("#element").carousel();
	        
			// TODO: later, a "Loading..." page can be implemented
			var loaded = Navigation.setup($, Settings);
			
			console.log("Navigation setup" + (loaded ? " " : "NOT ") + "initialized.");
			loaded = Game.init(Navigation.getGameFieldCanvas());
		}
	});
});