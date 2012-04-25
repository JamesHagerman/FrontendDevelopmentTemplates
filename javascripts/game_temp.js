// Variables:
jQuery.fx.interval = 30; // default: 13 slow down jQuery's animation redraw rate

// Models:

var Player = Backbone.Model.extend({
	initialize: function() {
		_.bindAll(this, 'draw', 'update');
	},
	
	defaults: {
		position: [0, 20],
		zoom: 1,
		direction: "right",
		health: 5,
		maxHealth: 10,
		speed: 8 
	},
	
	update: function() {
	
		var xAdjust = 0;
		var yAdjust = 0;
		
		var direction = null;
		if (this.get("direction") == "right" ) {
			direction = 1;
		} else if (this.get("direction") == "left" ) {
			direction = -1;
		}
		
		// Get array
		var array = this.get("position");
		
		// change array
		
		if (keydown.left) {
			xAdjust = -this.get("speed");
		}
		
		if (keydown.right) {
			xAdjust = this.get("speed");
		}
		
		if (keydown.up) {
			yAdjust = -this.get("speed");
		}
		
		if (keydown.down) {
			yAdjust = this.get("speed");
		}
		
		array[0] = array[0] + xAdjust;
		array[1] = array[1] + yAdjust;
		
		//array[0] = array[0] + (5 * direction);
		
		// store array again
		this.set({position: array });
		
		if (this.get("position")[0] >= 200) {
			this.set({direction: "left"});
		} else if (this.get("position")[0] < 0) {
			this.set({direction: "right"});
		} 
		
		debugLn("Position: [" + this.get("position")[0] + ", " + this.get("position")[1] + "]");
	},
	
	draw: function(ctx) {
		
		var x = this.get("position")[0];
		var y = this.get("position")[1];
		var scale = this.get("zoom");
		
		var radius = 13*scale;
		var centerOffset = x+(radius*scale);
		
		ctx.strokeStyle = "rgb(0,0,0)";
		ctx.lineWidth = 1; 
		ctx.fillStyle = "rgb(0,0,0)";
		ctx.beginPath();
	    ctx.arc(x, y, radius, -(Math.PI/180)*130, -(Math.PI/180)*230, true);
	    ctx.lineTo(centerOffset, y);
	    ctx.closePath();
	    ctx.stroke();
	    ctx.fill();
	},
	
});

var Piece = Backbone.Model.extend({
	initialize: function() {
		_.bindAll(this, 'draw', 'update');
	},
	
	defaults: {
		topofFloor: 150,
		screenPosition: [0,0],
		width: 10,
		height: 30,
		blockId: 0
	},
	
	update: function() {
		
	},
	
	draw: function(ctx) {
		ctx.fillStyle = "#000";
		ctx.fillRect(this.get("screenPosition")[0], this.get("screenPosition")[1], this.get("width"), this.get("height"));
		ctx.fillStyle = "#F00";
		ctx.fillText(this.get("blockId"), this.get("screenPosition")[0], this.get("screenPosition")[1] + 20);
	}
});

var Pieces = Backbone.Collection.extend({
	model: Piece,
	initialize: function (count) {
		_.bindAll(this, 'draw', 'update');
		
		var topofFloor = this.at(0).get("topofFloor");
		this.remove(this.at(0));
		
		for (i = 0; i <= count; i++) {
			this.add([{screenPosition: [i*10+(i*2), topofFloor], blockId: i}])
		}
	},
	
	update: function() {
		
	},
	
	draw: function(ctx) {
		this.forEach(function(itr) {
			itr.draw(ctx);
		});
	}
});

var App = Backbone.Model.extend({
	initialize: function() {
		_.bindAll(this, 'draw', 'update', 'clear');
	},
	
	defaults: {
		frameCount: 0,
		resizeTimerId: null,
	
		appName: "starting_template",
		
		canvas: null,
		context: null,
		gameInterval: null,
		playerOne: new Player(),
		pieces: new Pieces(10)
	},
	
	doneResizing: function() {
	},
	
	initalizeCanvas: function(canvas) {
		this.set({canvas: canvas[0]});
		this.set({context: this.get("canvas").getContext('2d')});
	},
	
	update: function() {
		debugLn("App.update called");
		this.set({frameCount: this.get("frameCount") + 1 });
		
		// Objects Update
		this.get("playerOne").update();
		
	},
	
	draw: function() {
		debugLn("App.draw called");
		debugLn("framecount: " + this.get("frameCount"));
		var ctx = this.get("context");
		this.clear(ctx);
		
		// Objects Draw:
		ctx.fillStyle = "rgb(255,0,0)";
		//ctx.fillRect(30, 30, 40, 40);
		
		this.get("pieces").draw(ctx);
		this.get("playerOne").draw(ctx);
	},
	
	clear: function(context) {
		context.clearRect(0, 0, 600, 600);
	}
	
});


// Make an instance of the App model to use for the rest of this project
var thisApp = new App;
var gameInterval = null;
var FPS = 30;

// After DOM is loaded - Most code should go here:
$(document).ready(
	function() {
					
		$(window).resize(function() {
			clearTimeout(thisApp.resizeTimerId);
			thisApp.resizeTimerId = setTimeout(thisApp.doneResizing, 10);
		});
		
		var message = $$({txt:'Hello World!<br /> This will go on a new line.'},'<div data-bind="txt" data-type="html"/>');
		$$.document.append(message);
		
		var debugObj = {
			debugMVC: $$({
				model: {debug_text: 'Debug:'},
				view: {
					format: "<div data-bind='debug_text' class='debug'/>",
					style: "& .debug {//display: none; z-index: 99; position: absolute; top: 0px; left: 0px; min-width: 300px; //height: 200px; background: #070; opacity: 0.9; font-size: 0.9em; overflow: scroll; font-family: 'Courier New', Courier, monospace; }"
				}
				// ,
				// 				controller: {
				// 					'click &': function() {
				// 						console.log("you clicked the root element of the debug view");
				// 					},
				// 					'change:debug_text': function() {
				// 						console.log("The debugObj model was changed (probably by a setter)");
				// 					}
				// 				}
				
			}),
			onPage: false,
			init: function() {
				$$.document.append(this.debugMVC);
				this.onPage = true;
			},
			log: function(newText) {
				if (!this.onPage) {this.init()}
				var existingDebug = this.debugMVC.model.get("debug_text");
				this.debugMVC.model.set({
					debug_text: existingDebug + newText
				});
			},
			logLn: function(newText) {
				if (!this.onPage) {this.init()}
				var existingDebug = this.debugMVC.model.get("debug_text");
				this.debugMVC.model.set({
					debug_text: existingDebug + "<br />" + newText
				});
			},
			clear: function() {
				if (!this.onPage) {this.init()}
				this.debugMVC.model.set({
					debug_text: newText
				}, {reset:true});
			}
		};
		
		//debugObj.init();
		
		$(".centered").on('click', function() {
			debugObj.logLn("a string");
			message.model.set({txt: "First line<br /><span style='color: red;'>Second line with red text in a span</span>"});
		});
		
		
		// Add something new to that App object:
		//thisApp.set({test: "hi"}); // variable named test gets added with the value of "hi"
		debugLn("We got this far: " + thisApp.get("test"));
		
		//thisApp.initalizeCanvas($('#mainCanvas'));
		//startGameLoop(thisApp);
		
		//debugLn("game running...");
		
	}
);

// After all elements load - Put CSS dependant code here:
$(window).load(
	function() {
		//$('body').animate({opacity: 1.0}, 500);
		
	}
);

function startGameLoop() {
	gameInterval = window.setInterval( runGameLoop , 1000/FPS );
}

function runGameLoop(toUpdate) {
	//debugLn("loop");
	debugClear();
	
	thisApp.update();
	thisApp.draw();
}

function stopGameLoop() {
	window.clearInterval(gameInterval);
}

