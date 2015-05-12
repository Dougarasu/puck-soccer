/* global window */
/* global draw */
define (function () {
	var proto, animationFrame = null, initialized = false, myEngine, then = null, now = null;	

	function makeNewEngine() {
		if (myEngine == null) {
			myEngine = Object.create(proto);
		}
		return myEngine;
	}

	function timeStamp() {
		return window.performance && window.performance.now ? window.performance.now() : Date.now();
	}

 	function setIntervalFrame () {
		if (!isPlaying) {
			return;
		}

		window.setTimeout(animationLoop, dt);

		now = timeStamp();
		passed = now - last;
		last = now;
		/*
		accumulator += passed;
		while (accumulator >= dt) {
			myGame.update(passed);
			accumulator -= dt;
		}*/
		update(dt);
		draw();
	}

	function update(deltaTime) {}

	function render() {}

	function frame() {
		animationFrame = window.requestAnimationFrame(frame);	
		setDeltaTime();
		update(myEngine.deltaTime);	
		render();
	}

	function setDeltaTime () {
		now = timeStamp();
		myEngine.deltaTime = (now - then) / 1000; // seconds since last frame
		then = now;
	}

	// TODO: make the security mode for all the methods, so the player can not overwrite them.
	proto = {
		fps: 60,
		deltaTime: 0,
		init: function (updateMethod, drawMethod) {
			update = updateMethod;
			render = drawMethod;
			initialized = true;
		},
		pause: function () {
			window.cancelAnimationFrame(animationFrame);
		},
		play: function () {
			then = Date.now();
			frame();
		}
	};

	return makeNewEngine();
});