$(document).ready(function() {
	
	/* Start of stooge object test */
	debugLn("Starting stooge test");
	var stoogePrototype = {
		name: "unknown",
		hairColor: "black",
		handleStoogePhone: function() {
			debugLn("StogePhone picked up!");
			debugLn("Name: " + this.name + " Hair color: " + this.hairColor);
		},
		update: function() {

		},
		draw: function() {

		}
	};

	var stoogeCaller = {
		stoogeList: [],
		addStooge: function(stooge) {
			this.stoogeList.push(stooge);
		},
		callStooges: function() {
			var stoogeCount = this.stoogeList.length;
			for (var i = 0; i < stoogeCount; i = i + 1) {
				this.stoogeList[i].handleStoogePhone();
			}
		}
	};


	var firstStooge = Object.create(stoogePrototype);
	var secondStooge = Object.create(stoogePrototype);

	stoogeCaller.addStooge(firstStooge);
	stoogeCaller.addStooge(secondStooge);

	firstStooge.name = "curly";
	secondStooge.name = "moe";

	stoogeCaller.callStooges();

	debugLn("Ending stooge test");

	/* End of stooge object test */
});