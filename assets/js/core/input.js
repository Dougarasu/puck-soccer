define (function () {
    var myInput, proto, inputRect, touchObj;
    
    function makeNewInput() {
        if (myInput == null) {
			myInput = Object.create(proto);
			myInput.mouseX = 0;
			myInput.mouseY = 0;
			myInput.inputPaused = false;
            myInput.mouseDown = false;
            myInput.mouseUp = false;
		}
		return myInput;
    }
    
    function setMousePosition(canvas, evt) {
        // Get the area where the mouse will interact
        inputRect = canvas.getBoundingClientRect();
        
		// Update the position of mouse according to the platform (mobile or desktop)
		myInput.mouseX = evt.clientX - inputRect.left;
		myInput.mouseY = evt.clientY - inputRect.top;
	}
    
    proto = {
        useMouse: function(canvas) {
            // Initialize all the necessary listeners
            canvas.addEventListener(myInput.isMobile.any() == null ? "mousedown" : "touchstart", function (e) {
				myInput.mouseDown = true;
				myInput.mouseUp = false;
				setMousePosition(canvas, myInput.isMobile.any() == null ? e : e.changedTouches[0]);
				myInput.onMouseDown();
				e.preventDefault();
			});
			
			canvas.addEventListener(myInput.isMobile.any() == null ? "mouseup" : "touchend", function (e) {
				myInput.mouseDown = false;
				myInput.mouseUp = true;
				myInput.onMouseUp();
				e.preventDefault();
			});
			
			canvas.addEventListener(myInput.isMobile.any() == null ? "mousemove" : "touchmove", function (e) {
				setMousePosition(canvas, myInput.isMobile.any() == null ? e : e.changedTouches[0]);
				if (myInput.mouseDown) {
				    myInput.onMouseDrag();
				}
				e.preventDefault();
			});
        },
        update: function(deltaTime) {},
        onMouseDrag: function() {},
        onMouseDown: function() {},
        onMouseUp: function() {},
        isMobile: {
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function() {
                return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows());
            }
        }
    };
    
    return makeNewInput();
});