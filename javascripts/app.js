// Variables:
jQuery.fx.interval = 30; // default: 13 slow down jQuery's animation redraw rate

// Models:
var App = Backbone.Model.extend({
	initialize: function() {
		_.bindAll(this, 'draw', 'clear');
	},
	doneResizing: function() {
	},
	resizeTimerId: null,
	
	appName: "starting_template",
	
	canvas: null,
	context: null,
	gameInterval: null,
	
	initalizeCanvas: function(canvas) {
		this.canvas = canvas[0];
		this.context = this.canvas.getContext('2d');
	},
	clear: function() {
		this.context.clearRect(0, 0, 400, 300);
	},
	
	draw: function() {
		this.clear();
		thisApp.context.fillStyle = "rgb(255,0,0)";
		thisApp.context.fillRect(30, 30, 50, 50);
		//this.stopGameLoop();
		
	},

	startGameLoop: function() {
		this.gameInterval = setInterval(this.draw, 10);
	},
	
	stopGameLoop: function() {
		clearInterval(this.gameInterval);
	}
	
});


// Make an instance of the App model to use for the rest of this project
var thisApp = new App;

// After DOM is loaded - Most code should go here:
$(document).ready(
	function() {
					
		$(window).resize(function() {
			clearTimeout(thisApp.resizeTimerId);
			thisApp.resizeTimerId = setTimeout(thisApp.doneResizing, 10);
		});
		
		// Add something new to that App object:
		thisApp.test = "hi"; // variable named test gets added with the value of "hi"
		debugLn("We got this far: " + thisApp.test);
		
		thisApp.initalizeCanvas($('#mainCanvas'));
		thisApp.startGameLoop();
		
		stringify(thisApp.appName);
		
	}
);

// After all elements load - Put CSS dependant code here:
$(window).load(
	function() {
		$('body').animate({opacity: 1.0}, 500);
		
	}
);

