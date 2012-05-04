/* Custom create function for the Object prototype. This will give us a lot of code orginization */
if (typeof Object.create !== 'function') {
	Object.create = function (o) {
		var F = function () {};
		F.prototype = o;
		return new F();
	}
}
/* end custom create method */

// Useful helpers:
function copyCssStyle(elementTo, elementFrom, stylename) {
	//debugLn("element to pull CSS from: style: " + stylename + " element: " + $(elementFrom).attr('class') + " value: " + $(elementFrom).css(stylename));
	//debugLn("element to send CSS too: style: " + stylename + " element: " + $(elementTo).attr('class') + " value: " + $(elementTo).css(stylename));
	$(elementTo).css(stylename, $(elementFrom).css(stylename));
	//debugLn("element to pull CSS from: style: " + stylename + " element: " + $(elementFrom).attr('class') + " value: " + $(elementFrom).css(stylename));
	//debugLn("element to send CSS too: style: " + stylename + " element: " + $(elementTo).attr('class') + " value: " + $(elementTo).css(stylename));
}

function randomBetween(start, end){
   return Math.floor(Math.random() * (end - start + 1) + start);
}

function isTouchDevice() {
	var el = document.createElement('div');
	el.setAttribute('id',"touchtesttoremove");
	el.setAttribute('ongesturestart', 'return;');
	if(typeof el.ongesturestart == "function"){
		$('#touchtesttoremove').remove();
		return true;
	} else {
		$('#touchtesttoremove').remove();
		return false;
	}
}

// $(function() {
//   window.keydown = {};
//   
//   function keyName(event) {
//     return jQuery.hotkeys.specialKeys[event.which] ||
//       String.fromCharCode(event.which).toLowerCase();
//   }
//   
//   $(document).bind("keydown", function(event) {
//     keydown[keyName(event)] = true;
//     event.preventDefault();
//   });
//   
//   $(document).bind("keyup", function(event) {
//     keydown[keyName(event)] = false;
//     event.preventDefault();
//   });
// });

// Debug tools:
function dumpObject(myObj) {
	//debugClear();
	console.log("");
	for (myKey in myObj){
		console.log("myObj["+myKey +"] = "+myObj[myKey]);
	}
}
// ONLY USE THIS WHEN dumpObject() FAILS! It has issues with prototypal inheritance
function stringify(myObj) {
	console.log(JSON.stringify(myObj));
}
