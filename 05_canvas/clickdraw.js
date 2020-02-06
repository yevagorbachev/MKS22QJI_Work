// Yevgeniy Gorbachev (Team superduperguacamole)
// SoftDev1 pd1
// K05 -- ...and I want to Paint It Better
// 2020-02-06

var state = "box";

var c = document.getElementById("slate");
var ctx = c.getContext("2d");
//ctx.fillStyle="#ff0000";
//ctx.fillRect(50, 50, 100, 200);

var clear = function(e){
	console.log(e);
	ctx.clearRect(0, 0, c.width, c.height);
}

var toggle = function(e){
	var mode = document.getElementById("mode");
	if (state == "box"){
		state = "dot";
		mode.innerHTML = "dot";
	}
	else {
		state = "box";
		mode.innerHTML = "box";
	}
	//console.log(state);
}

var draw = function(e){
	// e.offsetX offsets the mouseX by the x-coordinate of the event
	// give the mouse cursor location relative to the target(canvas)
	var x = e.offsetX;
	// same as e.offsetX but for the y-coordinate
	var y = e.offsetY;
	if (state == "box"){
		ctx.fillRect(x, y, 28, 28);
	}
	else {
		//ctx.beginPath() begins drawing a line/curve
		ctx.beginPath();
		ctx.arc(x, y, 10, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.fill();
	}
}

var cle = document.getElementById("cle");
cle.addEventListener('click', clear);

var tog = document.getElementById("tog");
tog.addEventListener('click', toggle);

c.addEventListener('click', draw);

// e.preventDefault();
// we didn't use it but if we did, it resorts to the default action if the event is not handled
// this would be used if we added event listener to the whole doc and we only want to paint within the canvas
