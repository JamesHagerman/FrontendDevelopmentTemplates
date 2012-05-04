$(document).ready(function() {

	/* test of create function */
	
	// create the prototype object
	var stoogePrototype = {
		name: "unknown",
		hairColor: "black",
		init: function() {
			$(this).on("StoogePhone", function(e) {
				debugLn("Name: " + e.target.name + " Hair color: " + e.target.hairColor);
			});
		}
	};

	var Stooge = function() {
		var f = Object.create(stoogePrototype);
		f.init();
		return f;
	}

	var firstStooge = Stooge();
	
	// spit out one of the attributes on the prototype object
	debugLn("ProtoStooge's name is: " + ProtoStooge.name);
	debugLn("ProtoStooge's hairColor is: " + ProtoStooge.hairColor);
	//ProtoStooge.init();
	
	debugLn("");
	
	
	// create a new object using the prototype of the first object */
	var anotherStooge = Object.create(ProtoStooge);
	anotherStooge.init();
	
	// spit out the same attributes as we did for the prototype but this time on the new instance of the object
	debugLn("anotherStooge's name is: " + anotherStooge.name);
	debugLn("anotherStooge's hairColor is: " + ProtoStooge.hairColor);
	
	debugLn("");
	
	// now change the new objects attribute to be a new value and spit it out:
	anotherStooge.name = "curly";
	debugLn("anotherStooge's name has been changed to: " + anotherStooge.name);
	
	debugLn("");
	
	// Build a new function onto the prototype of the "aStooge" Object.
	ProtoStooge.aNewFunction = function(theNewText) {
		debugLn("The function aNewFunction was called on a stooge object with the name of '" + this.name + "'!");
		debugLn("The function was passed: " + theNewText);
	}
	debugLn("We just added a new function to the ProtoStooge object. We will now call that function on anotherStooge:");
	
	// Call that new function on a PREEXISTING instance of the prototypal object to see how it inherits:
	anotherStooge.aNewFunction("WOW it worked");
	
	debugLn("");
	
	
	// create yet another new object using the prototype of the first object */
	var yetAnotherStooge = Object.create(ProtoStooge);
	yetAnotherStooge.init();
	yetAnotherStooge.name = "moe"
	
	// fire an event to try and ping all of our objects... we should get two responses back:
	debugLn("Firing an event to see who picks up the phone...");
	$(ProtoStooge).trigger("StoogePhone");
	//$(anotherStooge).trigger("StoogePhone");
	//$(yetAnotherStooge).trigger("StoogePhone");
	
	
	/* end test of create function */
	
});