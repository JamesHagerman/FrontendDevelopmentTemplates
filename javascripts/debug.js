// This debug library lets you use the debug(msg) debugLn(msg) and debugClear() commands when ever you want.
// 
// It officially depends on Agility to manage the debug view but it gracefully falls back as long as jQuery
// is available

var debugStyle = "z-index: 99;" + 
"position: absolute;" +
"top: 0px;" + 
"right: 0px;" +
"min-width: 300px;" +
//"height: 200px;" +
//"display: none;" +
"background-color: #070;" +
"opacity: 0.9;" +
"font-size: 0.9em;" +
"overflow: scroll;" +
"font-family: 'Courier New', Courier, monospace;";
var _onPage;
var _version;
try {
	var Debug = {
		debugMVC: $$({
			model: {debug_text: 'Debug:'},
			view: {
				format: "<div data-bind='debug_text' data-type='html'/>",
				style: "& {" + debugStyle + "}"
			}
		}),
		_onPage: false,
		init: function() {
			$$.document.append(this.debugMVC);
			this.onPage = true;
			_version = "agility";
		},
		log: function(newText) {
			if (!this._onPage) {this.init()}
			var existingDebug = this.debugMVC.model.get("debug_text");
			this.debugMVC.model.set({
				debug_text: existingDebug + newText
			});
		},
		logLn: function(newText) {
			if (!this._onPage) {this.init()}
			var existingDebug = this.debugMVC.model.get("debug_text");
			this.debugMVC.model.set({
				debug_text: existingDebug + "<br />" + newText
			});
		},
		clear: function() {
			if (!this._onPage) {this.init()}
			this.debugMVC.model.set({
				debug_text: "Debug:"
			}, {reset:true});
		}
	};
}
catch(err) {
	console.log("");
	console.log("There was an error setting up the Agility debugging layer: " + err);
	Debug = false;
	_onPage = false;
}

// Simple debug methods
function initDebug() {
	_onPage = true;
	_version = "jquery";
	$('body').append('<div class="debug" style="' + debugStyle + '">Debug:</div>');
}

function debug(toSpit) {
	if ( Debug !== false) {
		Debug.log(toSpit);
	} else {
		if (!_onPage) {initDebug()}
		$('.debug').append("  |" + toSpit);
	}
}
function debugLn(toSpit) {
	if ( Debug !== false) {
		Debug.logLn(toSpit);
	} else {
		if (!_onPage) {initDebug()}
		$('.debug').append("<br />" + toSpit );
	}
}
function debugClear() {
	if ( Debug !== false) {
		Debug.clear();
	} else {
		if (!_onPage) {initDebug()}
		$('.debug').html("<span>Debug:</span><br />");
	}
}


// Override native console.log. Probably not the best idea...
var console = {};
console.log = function (msg) {
	debugLn(msg);
}