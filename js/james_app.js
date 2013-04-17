// Variables:
jQuery.fx.interval = 30; // default: 13 slow down jQuery's animation redraw rate

// After DOM is loaded - Most code should go here:
$(document).ready(
	function() {
		
		var gameInterval = null;
		var _FPS = 30;
		var _game_halted = true;
		var _frame = 0;
		var _paper;
		var _width;
		var _height;
		
		var node_start_player, node_start_npc, node_start_player_first, node_start_npc_first, node_takable, node_powerup;
		var player_color = "#FF0000", npc_color = "#0000FF", takable_color = "#00FF00";
		var node_size = 20;
		var layer_height = node_size * 2.5;
		var new_x = 0;
		var new_y = 0;
		var current_x_offset = 0, current_y_offset = 0;
		
		$(window).resize(function() {
			
		});
		
		$("body.turnedoff").on('click', function() {
			
			//news = new NewsCollection();
			//news.fetch();
			//debugLn(news);
			
			if(_game_halted) {
				debugLn("Starting the game loop");
				startGameLoop();
			} else {
				debugLn("Stopping the game loop");
				stopGameLoop();
			}
			
			
		});
		
		
		
		raphInit();
		
		function raphInit() {
			debugLn("init");
			
			_paper = new Raphael(0,0, 1000, 1000);
			_width = _paper.width;
			_height = _paper.height;
			
			node_start_player = _paper.circle(_width/2, _height/2, node_size).attr({stroke: Raphael.getRGB(player_color), fill: Raphael.getRGB(player_color), "fill-opacity": .8}).click(function(e) {
				debugLn("Clicked red start node!" + e.x + ", " + e.y);
				moveCamera(_paper, e.x, e.y);
				drawRandomNodes(_paper, randomBetween(4,10));
			});
		}
		
		function moveCamera(raph_paper, xval, yval) {
			scale = 1;
			
			node_size = node_size / scale;
			
			_width = _width / scale;
			_height = _height / scale;
			
			center_x = _width/2;
			center_y = _height/2;
			
			new_x_offset = current_x_offset + xval - center_x;
			new_y_offset = current_y_offset + yval - center_y;
			
			raph_paper.setViewBox(new_x_offset, new_y_offset, _width, _height);
			current_x_offset = new_x_offset;
			current_y_offset = new_y_offset;
		}
		
		function drawRandomNodes(raph_paper, count) {
			debugLn("Drawing " + count + " new nodes in random directions");
			//count = 1;
			for (var i=0; i < count; i = i + 1) {
				//debugLn(" drawing a cicrle: ");
				raph_paper.circle(randomBetween(new_x_offset, new_x_offset + _width), randomBetween(new_y_offset, new_y_offset + _height), randomBetween(node_size, node_size*3))
						.attr({
							stroke: Raphael.getColor(),
							fill: Raphael.getColor(),
							"fill-opacity": .8}).click(function(e) {
								moveCamera(_paper, e.x, e.y);
								drawRandomNodes(_paper, randomBetween(4,10));
							});
			}
		}
		
		function drawNewNodes(raph_paper, last_layer_height) {
			debugLn("drawing a new node" + last_layer_height);
			raph_paper.circle(30, last_layer_height + layer_height, 20).attr({stroke: Raphael.getRGB(npc_color), fill: Raphael.getRGB(takable_color), "fill-opacity": .3}).click(function() {
				debugLn("Clicked First Blue node! You'll be blue! Start your run!");
				drawNewNodes(_paper);
			});
		}
		
		function update() {
			debugLn("update running...");
			
		}
		
		function draw() {
			debugLn("draw running...");
			//var circle = _paper.circle(100, 100, 80);
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
		
		
		
		
		
		
		var message = $$({txt:'Hello World!<br /> This will go on a new line.'},'<div data-bind="txt" data-type="html"/>');
		$$.document.append(message);
		
		window.NewsItem = Backbone.Model.extend({
			
		});
		window.NewsCollection = Backbone.Collection.extend({
			model: NewsItem,
			
			//public_api_key: 'A public api key from topics.io',
			//url_base: 'http://api.topics.io/topics/news/v1/?page=1&auth_api_key=',
			url_base: 'https://api.facebook.com/method/users.getInfo?uids=4&fields=name&access_token=AAAAAAITEghMBAIye8iTErR6YxvL3T4VCAphQjaifu42i40qhjds6G9tWzdHwQzbWxJmYQNh2LHU8Wzqo8zJSLLM7fxuUhkBaHxVc1QZDZD&format=json',
			
			url: function() {
				return this.url_base;// + this.public_api_key
			},
			
			parse: function(response) {
				stringify(response);
				return response.request_args;
			}
		});
		
	}
);

// After all elements load - Put CSS dependant code here:
$(window).load(
	function() {
		//$('body').animate({opacity: 1.0}, 500);
		
	}
);
