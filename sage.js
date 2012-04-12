var colorbool = false;

var background_image = null;
function loadNewBackground() {
	background_image = new Image(); 
	background_image.onload = function(){
		document.getElementById("background_image").src = background_image.src;	
	}
	background_image.src = "rand_image.php";
	
	
}


function windowResize() {
        animate("background_image","height",window.innerHeight,0);
        animate("background_image","width",window.innerWidth,0);
}

$(document).ready(function() {
	document.onkeydown = keyEvent;
        registerKeyEvent(192,toggleConsole);
        addAnimatable("nav");
        addAnimatable("status");
        addAnimatable("progress");
        addAnimatable("console");
        addAnimatable("background_image");
        animate("status","right",-90,0);
        animate("console","height",0,0);
        animate("console","opacity",0,0);
        animate("nav","red",0,0,color);
        animate("background_image","height",window.innerHeight,0);
        animate("background_image","width",window.innerWidth,0);
 	
	document.getElementById("status").addEventListener("mouseover",openStatus);
	document.getElementById("status").addEventListener("mouseout",closeStatus);
	window.onresize=windowResize;
	
	loadNewBackground();
	
	requestAnimationFrame(masterAnimate);
});



function openStatus(e) {
	animate('status','right',0,0.5);
}
function closeStatus(e) {
	animate('status','right',-90,0.5);
}
function getStatusWidth() {
	return document.getElementById("status").innerWidth;
}

var consoleState = false;
function toggleConsole() {
        if(consoleState) {
                animate("console","height",0,0.5);
                animate("console","opacity",0,0.5);
        } else {
                animate("console","height",300,0.5);
                animate("console","opacity",1,0.5);
        }
        consoleState = !consoleState;
}
function color() {
        if(colorbool) {
                value = 0;
        } else {
                value = 256;
        }
        colorbool = !colorbool;
        animate("nav","red",value,1,color);
}