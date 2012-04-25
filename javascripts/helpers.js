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

// Debug library:
function dumpObject(myObj) {
	debugClear();
	debugLn("");
	for (myKey in myObj){
		debugLn("myObj["+myKey +"] = "+myObj[myKey]);
	}
}
function stringify(myObj) {
	debugLn(JSON.stringify(myObj));
}
function debug(toSpit) {
	$('.debug').append("  |" + toSpit);
}
function debugLn(toSpit) {
	$('.debug').append(toSpit + "<br />");
}
function debugClear() {
	$('.debug').html("<span>Debug:</span><br />");
}