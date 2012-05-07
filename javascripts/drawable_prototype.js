
var drawablePrototype = {
	name: "unknown",
	spitInfo: function() {
		debugLn("SpitInfo called for a drawable:");
		debugLn("Name: " + this.name);
	},
	update: function(ctx) {
		debugLn("No update method for drawable with name " + this.name);
	},
	draw: function(ctx) {
		debugLn("No draw method for drawable with name " + this.name);
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
