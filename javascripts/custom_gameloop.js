$(document).ready(function() {
	
	var gameInterval = null;
	var _FPS = 30;
	var _game_halted = true;
	var _frame = 0;
	var _paper;
	var _width;
	var _height;
	
	$("#test-canvas").on('click', function() {
		
		if(_game_halted) {
			debugLn("Starting the game loop");
			startGameLoop();
		} else {
			debugLn("Stopping the game loop");
			stopGameLoop();
		}
		
	});
	
	gameInit();
	
	function gameInit() {
		debugLn("init");
	}

	
	function update() {
		debugLn("update running...");
		
	}
	
	function draw() {
		debugLn("draw running...");
		
	}
	
	function startGameLoop() {
		gameInterval = window.setInterval( runGameLoop , 1000/_FPS );
		_game_halted = false;
	}

	function runGameLoop(toUpdate) {
		if (!_game_halted) {
			_frame = _frame + 1;
			debugClear();
			debugLn("loop " + _frame);
			update();
			draw();
			
		} else {
			_frame = 0;
			window.clearInterval(gameInterval);
		}
		
	}

	function stopGameLoop() {
		_game_halted = true;
	}
});