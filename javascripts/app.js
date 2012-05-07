/* jQuery Configuration Variables */

// Slow down jQuery's animation redraw rate
//jQuery.fx.interval = 30; // default: 13 


// After DOM is loaded - Most code should go inside the following anonymous function:
$(document).ready(function() {
	
	// All of our variables should go here:
	var assets;
	var stage;
	var w, h;
	var sky, grant, ground, hill, hill2;
	var runningRate, isInWarp, isStationary;
	var stationaryPosition, isPassed;
	
	// $(window).resize(function() {
	// 	
	// });
	
	
	// Initialize the Easel JS code:
	init();
	
	function init() {
		document.getElementById("loader").className = "loader";
		
		var canvasType = "html";
		//canvasType = "js"; // Doesn't work :(
			
		if (canvasType === "html") {
			var canvas = document.getElementById("htmlCanvas"); 	// HTML canvas
		} else if (canvasType === "js"){
			
			// Dynamically generating canvas elements for EaselJS doesn't seem to work using this method
			
			var canvas = document.createElement("canvas"); 			// Generated canvas
			document.getElementById("CanvasHolderJs").appendChild(canvas);
		}
		
		if (typeof FlashCanvas !== "undefined") {
			alert("IE! Trying to init FlashCanvas");
			FlashCanvas.initElement(canvas);
			
		} else if (typeof G_vmlCanvasManager !== "undefined") {
			alert("IE! Trying to init ExplorerCanvas");
			
			//var canvas = document.createElement('canvas');
			G_vmlCanvasManager.initElement(canvas);
			//var ctx = el.getContext('2d');
			
		} else {
			//alert("Not IE! Animations should work!");
		}
		
		stage = new Stage(canvas);


		runningRate = 2.5;
		isInWarp = false;
		isStationary = false;
		stationaryPosition = 300;
		isPassed = false;

		// grab canvas width and height for later calculations:
		w = canvas.width;
		h = canvas.height;

		assets = [];

		manifest = [
			{src:"assets/runningGrant.json", id:"json"},
			{src:"assets/runningGrant.png", id:"grant"},
			{src:"assets/sky.png", id:"sky"},
			{src:"assets/ground.png", id:"ground"},
			{src:"assets/parallaxHill1.png", id:"hill"},
			{src:"assets/parallaxHill2.png", id:"hill2"}
		];


		loader = new PreloadJS();
		loader.onFileLoad = handleFileLoad;
		loader.onComplete = handleComplete;
		loader.loadManifest(manifest);
		stage.autoClear = false;

		document.onkeypress = handlePress;
	}
	
	function handleFileLoad(event) {
		assets.push(event);
	}

	function handleComplete() {
		for(var i=0;i<assets.length;i++) {
			var item = assets[i]; //loader.getResult(id);
			var id = item.id;
			var result = item.result;

			if (item.type == PreloadJS.IMAGE) {
				var bmp = new Bitmap(result);
			}

			switch (id) {
				case "sky":
					sky = new Shape(new Graphics().beginBitmapFill(result).drawRect(0,0,w,h));
					break;
				case "ground":
					ground = new Shape();
					var g = ground.graphics;
					g.beginBitmapFill(result);
					g.drawRect(0, 0, w+330, 79);
					ground.y = h-79;
					break;
				case "hill":
					hill = new Shape(new Graphics().beginBitmapFill(result).drawRect(0,0,282,59));
					hill.x = Math.random() * w;
					hill.scaleX = hill.scaleY = 3;
					hill.y = 144;
					break;
				case "hill2":
					hill2 = new Shape(new Graphics().beginBitmapFill(result).drawRect(0,0,212,50));
					hill2.x = Math.random() * w;
					hill2.scaleX = hill2.scaleY = 3;
					hill2.y = 171;
					break;
				case "json":
					try {
						eval("var json="+result);// Convert to an object.
					} catch (e) {
						continue;
					}
					var ss = new SpriteSheet(json);
					grant = new BitmapAnimation(ss);

					// Set up looping
					ss.getAnimation("run").next = "run";
					ss.getAnimation("jump").next = "run";
					grant.gotoAndPlay("run");

					// Position the Grant sprite
					grant.x = -200;
					grant.y = 0;
					grant.scaleX = grant.scaleY = 0.8;
					break;
			}
		}

		document.getElementById("loader").className = "";
		
		if (grant == null) {
			//console.log("Can not play. Grant sprite was not loaded.");
			return;
		}

		stage.addChild(sky, ground, hill, hill2, grant);
		stage.onMouseDown = handlePress;

		// Game loop setup:
		Ticker.setFPS(40);
		
		// Don't set the whole window to listen for the tick event, just call this one function
		//  This acts as the main game loop.
		console.log("Ticker set!");
		Ticker.addListener(function () {
			
			var outside = w + 20;
			var position = grant.x+runningRate;
			grant.x = (position >= outside) ? -200 : position;

			ground.x = (ground.x-15) % 330;
			hill.x = (hill.x - 0.8);
			if (hill.x + 838 <= 0) { hill.x = outside; }
			hill2.x = (hill2.x - 1.2);
			if (hill2.x + 633 <= 0) { hill2.x = outside; }
			
			// Update all drawable
			//debugClear();
			//drawableCollection.spitAll();

			//stage.update();
			
		});
	}

	function handlePress(event) {
		grant.onAnimationEnd = handleJumpStart;
	}

	function handleJumpStart() {
		grant.gotoAndPlay("jump");
		grant.onAnimationEnd = null;
	}
	
	
	
	/* Custom game loop implementation */
	var gameInterval = null;
	var _FPS = 60;
	var _game_halted = true;
	var _frame = 0;
	var _paper;
	var _width;
	var _height;
	
	var _gameCanvas = {};
	_gameCanvas.context = null;
	_gameCanvas.width = null;
	_gameCanvas.height = null;
	
	$("#htmlCanvas").on('click', function() {
		
		// if(_game_halted) {
		// 	debugLn("Starting the game loop");
		// 	startGameLoop();
		// } else {
		// 	debugLn("Stopping the game loop");
		// 	stopGameLoop();
		// }
		
	});
	
	startGameLoop();
	
	gameInit();
	
	function gameInit() {
		debugLn("init");
		
		_gameCanvas.width = document.getElementById("htmlCanvas").width;
		_gameCanvas.height = document.getElementById("htmlCanvas").height;
		_gameCanvas.context = document.getElementById("htmlCanvas").getContext("2d");
		
		
		/* Start of stooge object test */
		var drawableOne = Object.create(drawablePrototype);
		drawableOne.name = "ship";
		drawableOne.x = 0;
		drawableOne.y = 0;
		drawableOne.xSpeed = 0.1;
		drawableOne.ySpeed = 5;
		drawableOne.xDir = 1;
		drawableOne.yDir = 1;
		drawableOne.width = 10;
		drawableOne.height = 40;
		drawableOne.update = function(ctx) {
			if (this.x + this.height > _gameCanvas.width || this.x < 0) {
				this.xDir = this.xDir * -1;
			}
			
			if (this.y + this.width > _gameCanvas.height || this.y < 0) {
				this.yDir = this.yDir * -1;
			}
			
			this.x = this.x + (this.xSpeed * this.xDir);
			this.y = this.y + (this.ySpeed * this.yDir);
			
		};
		drawableOne.draw = function(ctx) {
			ctx.fillStyle = "rgb(200,0,0)";  
			ctx.fillRect (this.x, this.y, this.height, this.width);
		};
		
		var drawableTwo = Object.create(drawablePrototype);
		drawableTwo.name = "rock";

		/* add all of those drawables to the drawable collection */
		/* Actually, just add the ones you want to call in bulk... */
		drawableCollection.add(drawableOne);
		drawableCollection.add(drawableTwo);

		drawableCollection.spitAll();
		/* End of drawable object test */
		
		
	}

	
	function update(ctx) {
		debugLn("update running...");
		drawableCollection.updateAll(ctx);
	}
	
	function draw(ctx) {
		debugLn("draw running...");
		drawableCollection.drawAll(ctx);
	}
	
	function startGameLoop() {
		gameInterval = window.setInterval( runGameLoop , 1000/_FPS );
		_game_halted = false;
	}

	function runGameLoop(toUpdate) {
		if (!_game_halted) {
			_frame = _frame + 1;
			debugClear();
			_gameCanvas.context.clearRect(0,0,960,400);
			debugLn("loop " + _frame);
			update(_gameCanvas.context);
			draw(_gameCanvas.context);
			
		} else {
			_frame = 0;
			window.clearInterval(gameInterval);
		}
		
	}

	function stopGameLoop() {
		_game_halted = true;
	}
	
});

// After all elements load - Put code that needs access to "real" CSS attributes here:
$(window).load(
	function() {
		//$('body').animate({opacity: 1.0}, 500); // Fade in the whole page once everything is loaded
		
	}
);

