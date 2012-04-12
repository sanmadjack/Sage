function writeError(message) {
	document.getElementById("console").innerHTML += "<p class=\"error\">" + message + "</p>\n";
}

function dumpObject(object) {
	writeError(object);
	for(prop in object) {
		writeError(prop + ": " + object[prop]);
	}


}


var keyEvents = [];

function keyEvent(e) {
	var key;
	if(window.event) {
		key = window.event.keyCode;
	} else {
		key = e.keyCode;
	}

	
	
	event = keyEvents[key];
	if(event!=undefined) {
		event();
	}
}
function registerKeyEvent(key,func) {
	keyEvents[key] = func;
}


requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var start = Date.now();



var animatables = [];

function addAnimatable(id) {
	animatables[id] = new Animatable(id);
}
function AnimatableProperty(value,unit) {
	this.unit = unit;
	this.value = value;
	this.target = value;
	this.time_remaining = 0;
	this.when_done = undefined;
	this.toString = function() {
		if(this.value==undefined) {
			return undefined;
		}

		if(this.unit==undefined) {
			return this.value;
		} else {
			return this.value + this.unit;
		}
	}
	this.reset = function() {
		this.value = this.target;
		this.time_remaining = 0;
		if(this.when_done!=undefined)
			this.when_done();
	}
	this.iterate = function(time_diff) {
		// This one should fire off on the first run
		if(this.value==undefined) {
			this.reset();
			return;
		}

		// This happens if the animation has run its course
		if(time_diff >= this.time_remaining||
			this.time_remaining<=0) {
			this.reset();
			return;
		}

		var remain = time_diff / this.time_remaining;

		var increment = Math.abs(this.value - this.target);
		increment *= remain;;
		

		if(this.value > this.target) {
			this.value -= increment;
			if (this.value < this.target) {
				this.reset();
				return;
			}
		} else if(this.value < this.target) {
			this.value += increment;
			if(this.value > this.target) {
				this.reset();
				return;
			}
		} else {
			this.reset();
			return;
		}
		this.time_remaining -= time_diff;;
	}
}

function Animatable(id) {
	this.id = id;
	this.element = document.getElementById(id);
	this.style = this.element.style;
	if(this.element==null||
		this.element==undefined) {
		throw "Element " + id + " does not exist!";
	}

	this.height = new AnimatableProperty(undefined,"px");
	this.width = new AnimatableProperty(undefined,"px");
	this.left = new AnimatableProperty(undefined,"px");
	this.right = new AnimatableProperty(undefined,"px");
	this.top = new AnimatableProperty(undefined,"px");
	this.bottom = new AnimatableProperty(undefined,"px");

	this.red = new AnimatableProperty(undefined,undefined);
	this.green = new AnimatableProperty(undefined,undefined);
	this.blue = new AnimatableProperty(undefined,undefined);


	this.opacity = new AnimatableProperty(undefined,undefined);

	this.iterate = function(time_diff) {
        	for(prop in this) {
        		var value = this[prop];

                	if(prop=="id"||prop=="element"||prop=="style"||prop=="iterate"||
                   	   value==undefined||value.value==value.target)
                		continue;

     		        
			value.iterate(time_diff);
			var elem = this.element;
        		switch(prop) {
                		case "red":
                		case "green":
                		case "blue":
					elem.style.color = "rgb(" + convertColor(this.red.value) + "," + convertColor(this.green.value) + "," + convertColor(this.blue.value) + ")";
					break;
                		default:
                        		elem.style[prop] = value.toString();;
                        		break;
        		}
        	}
	}
	
}

function convertColor(value) {
	if(value==undefined)
		return 0;

	if(value>256)
		return 256;

	if(value<0)
		return 0;

	value = Math.round(value);

	return value;
}
function setProperty(elem,property,value) {
	switch(property) {
		default:
			elem.style[property] = value;
			break;
	}
}

function animate(id,property,value,time,when_done) {
	var elem = animatables[id];
	var prop = elem[property];
	prop.target = value;
	prop.time_remaining = time*1000;	
	prop.when_done = when_done;
}

function getProperty(elem,property) {
	var value = elem.style[property];

	if(value==undefined)
		value = "000";
	switch(property) {
		case "id":
		case "element":
		case "style":
		case "animate":
			return undefined;
		case "top":
                case "bottom":
                case "left":
                case "right":
                case "height":
                case "width":
                	value = value.substring(0,value.length-2);
                        value = parseInt(value);
			break;
		case "red":
		case "green":
		case "blue":
				




			break;
                default:
                        value = parseInt(value);
			break;
	}
	return value;
}

var last_time = Date.now();
function masterAnimate(timestamp) {
	var progress = timestamp - start;
	var i;
	var time_diff = timestamp - last_time;
	for(i in animatables) {
		var anime = animatables[i];
		anime.iterate(time_diff);		
		last_time = timestamp;
	}

	requestAnimationFrame(masterAnimate);
}
