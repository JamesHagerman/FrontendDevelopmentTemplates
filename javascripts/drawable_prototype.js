
var drawablePrototype = {
	name: "unknown",
	hairColor: "black",
	spitInfo: function() {
		debugLn("SpitInfo called for a drawable:");
		debugLn("Name: " + this.name + " Hair color: " + this.hairColor);
	},
	update: function(ctx) {
		
	},
	draw: function(ctx) {
		
	}
};

var drawableCollection = {
	drawableList: [],
	add: function(drawable) {
		this.drawableList.push(drawable);
	},
	spitAll: function() {
		var drawableCount = this.drawableList.length;
		for (var i = 0; i < drawableCount; i = i + 1) {
			this.drawableList[i].spitInfo();
		}
	},
	updateAll: function(ctx) {
		var drawableCount = this.drawableList.length;
		for (var i = 0; i < drawableCount; i = i + 1) {
			this.drawableList[i].update(ctx);
		}
	},
	drawAll: function(ctx) {
		var drawableCount = this.drawableList.length;
		for (var i = 0; i < drawableCount; i = i + 1) {
			this.drawableList[i].draw(ctx);
		}
	}
};
