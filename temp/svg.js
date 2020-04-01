//refactored-fiesta - Yevgeniy Gorbachev & Junhee Lee
//SoftDev pd1
//K14 -- Ask Circles [Change || Die] While Moving, etc.
//2020-03-31

//initialization
const image = document.getElementById("vimage");
const clear_button = document.getElementById("clear");
const move_button = document.getElementById("move");

const w3svg = "http://www.w3.org/2000/svg";
const DOT_RADIUS = 10;
const DOT_COLOR_0 = "black";
const DOT_COLOR_1 = "red";

let deltas = [];
animation_id = 0;

const dot = function(x, y) {
	let circle = document.createElementNS(w3svg, "circle");
	circle.setAttribute("cx", x);
	circle.setAttribute("cy", y);
	circle.setAttribute("r", DOT_RADIUS);
	circle.setAttribute("fill", DOT_COLOR_0);
	return circle;
};


const step_bounce_box = function(image, element, delta) {
	bounds = [
		[DOT_RADIUS, image.style.width - DOT_RADIUS],
		[DOT_RADIUS, image.style.height - DOT_RADIUS]
	];
	console.log(bounds[0]);
	pos = [parseInt(element.getAttribute("cx")), parseInt(element.getAttribute("cy"))];
	hits = [
		[pos[0] <= bounds[0][0], pos[0] >= bounds[0][1]],
		[pos[1] <= bounds[1][0], pos[1] >= bounds[1][1]]
	];

	if (hits[0][0] || hits[0][1]) {
		console.log("hit side");
		delta[0] = -delta[0];
	};
	if (hits[1][0] || hits[1][1]) {
		console.log("hit floor or ceiling")
		delta[1] = -delta[1];
	};

	element.setAttribute("cx", pos[0] + delta[0]);
	element.setAttribute("cy", pos[1] + delta[1]);
}

const animate = function(animation) {
	let ret = function(e) {
		window.cancelAnimationFrame(animation_id);
		animation(e);
		console.log('requesting next frame');
		animation_id = window.requestAnimationFrame(animate(animation));
	};
	return ret;
};

const stop_anim = function(e) {
	if (animation_id) {
		window.cancelAnimationFrame(animation_id);
	}
};

const draw = function(e) {
	if (e.target == image) {
		new_dot = dot(e.offsetX, e.offsetY);
		// new_dot.addEventListener("click", mutate(0));
		image.appendChild(new_dot);
		deltas = deltas.concat([[1,1]]);
	};
};

const frame = function(e) {
	dots = image.children;
	for (let i = 0; i < dots.length; i++) {
		step_bounce_box(image, dots[i], deltas[i]);
	};
};

image.addEventListener("click", draw);
move_button.addEventListener("click", animate(frame));

// const draw = function(e) {
//     if (e.target == pic) {
//         let x = e.offsetX;
//         let y = e.offsetY;
//         let dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
//         dot.setAttribute("cx", x);
//         dot.setAttribute("cy", y);
//         dot.setAttribute("r", DOT_RADIUS);
//         dot.setAttribute("fill", DOT_COLOR_0);
//         dot.addEventListener("mousedown", color);
//         pic.appendChild(dot);
//     }
// };

// const color = function() {
// 	this.removeEventListener("mousedown", color);
// 	this.setAttribute("fill", DOT_COLOR_1);
// 	this.addEventListener("mousedown", die);
// };

// const die = function() {
//     this.removeEventListener('mousedown', die);
//     this.setAttribute('fill', DOT_COLOR_0);
//     let x_range = bbox.width - 2 * DOT_RADIUS;
//     let y_range = bbox.height - 2 * DOT_RADIUS;
//     let x_offset = bbox.left + DOT_RADIUS;
//     let y_offset = bbox.top + DOT_RADIUS;
//     this.setAttribute('cx', Math.floor(Math.random() * x_range) + x_offset);
//     this.setAttribute('cy', Math.floor(Math.random() * y_range) + y_offset);
//     this.addEventListener('mousedown', color);
// };

// const clear = function() {
// 	pic.innerHTML = '';
// };

// pic.addEventListener("mousedown", draw);
// button.addEventListener("click", clear);
