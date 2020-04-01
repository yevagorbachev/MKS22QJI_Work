//refactored-fiesta - Yevgeniy Gorbachev & Junhee Lee
//SoftDev pd1
//K14 -- Ask Circles [Change || Die] While Moving, etc.
//2020-03-31

//initialization
const pic = document.getElementById("vimage");
const button = document.getElementById("clear");
const xtra = document.getElementById("xtra");
const move = document.getElementById("move");
const bbox = pic.getBoundingClientRect();
const DOT_RADIUS = 25;
const DOT_COLOR_0 = "black";
const DOT_COLOR_1 = "red";
const X_SPEED = 2;
const Y_SPEED = 1;
var frame;
var projectileData = [];

const draw = function(e) {
	if (e.target == pic) {
		let x = e.offsetX;
		let y = e.offsetY;
		let dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		dot.setAttribute("cx", x);
		dot.setAttribute("cy", y);
		dot.setAttribute("r", DOT_RADIUS);
		dot.setAttribute("fill", DOT_COLOR_0);
		dot.addEventListener("mousedown", color);
		dot.id = projectileData.length;
		projectileData.push(-1);
		pic.appendChild(dot);
	}
};

const color = function() {
	this.removeEventListener("mousedown", color);
	this.setAttribute("fill", DOT_COLOR_1);
	this.addEventListener("mousedown", die);
};

const die = function() {
	projectileData[this.id] = -1;
	this.removeEventListener('mousedown', die);
	this.setAttribute('fill', DOT_COLOR_0);
	let x_range = bbox.width - 2 * DOT_RADIUS;
	let y_range = bbox.height - 2 * DOT_RADIUS;
	let x_offset = bbox.left + DOT_RADIUS;
	let y_offset = bbox.top + DOT_RADIUS;
	this.setAttribute('cx', Math.floor(Math.random() * x_range) + x_offset);
	this.setAttribute('cy', Math.floor(Math.random() * y_range) + y_offset);
	this.addEventListener('mousedown', color);
};

const anim = function() {
	dots = document.getElementsByTagName("circle");
	for (let dot of dots) {
		if (projectileData[dot.id] < 0) {
			projectileData[dot.id] = "0";
		}
	}
}

const propulse = function() {
	dots = document.getElementsByTagName("circle");
	for (let dot of dots) {
		let id = Number(dot.id);
		let data = Number(projectileData[id]);
		if (data >= 0) {
			if (data % 2) {
				dot.setAttribute("cx", Number(dot.getAttribute("cx")) - X_SPEED);
			}else {
				dot.setAttribute("cx", Number(dot.getAttribute("cx")) + X_SPEED);
			}
			if (data > 1) {
				dot.setAttribute("cy", Number(dot.getAttribute("cy")) - Y_SPEED);
			}else {
				dot.setAttribute("cy", Number(dot.getAttribute("cy")) + Y_SPEED);
			}
			x = dot.getAttribute("cx");
			y = dot.getAttribute("cy");
			if (x < DOT_RADIUS) {
				projectileData[id] = data - 1;
			}
			if (x > bbox.width - DOT_RADIUS) {
				projectileData[id] = data + 1;
			}
			if (y < DOT_RADIUS) {
				projectileData[id] = data - 2;
			}
			if (y > bbox.width - DOT_RADIUS) {
				projectileData[id] = data + 2;
			}
		}
	}
	frame = window.requestAnimationFrame(propulse);
}

const clear = function() {
	pic.innerHTML = '';
};

const resize = function() {
	dots = document.getElementsByTagName("circle");
	for (let dot of dots) {
		dot.setAttribute("r", Math.floor(1 + Math.random() * DOT_RADIUS));
	}
};

pic.addEventListener("mousedown", draw);
move.addEventListener("click", anim);
button.addEventListener("click", clear);
xtra.addEventListener("click", resize)

propulse();
