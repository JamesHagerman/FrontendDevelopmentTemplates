// jQuery Starter
//
// This file contains the basic blocks needed to begin developing a jQuery app.
//
// If you want to to develop an Ember.js app instead, you will probably want to
// modify js/ember-app.js instead. That said, there's no real reason you couldn't
// use both...
//

// Global Setup Variables:
jQuery.fx.interval = 30; // default: 13 slow down jQuery's animation redraw rate

// This block will run after the DOM is loaded - Most code should go here:
$(document).ready(
	function() {
		console.log("jQuery Ready!");
	}
);

// This block will run after all elements are placed in the DOM - Put CSS dependant code here:
$(window).load(
	function() {
		//$('body').animate({opacity: 1.0}, 500);
	}
);
