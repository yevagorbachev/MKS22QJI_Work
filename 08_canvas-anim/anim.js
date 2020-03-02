/*
Yevgeniy Gorbachev
SoftDev pd1
K08 -- What is it saving the screen from?
2020-02-14
*/
const canvas = document.getElementById("canvas");
const canvas_context = canvas.getContext("2d");

const start_circle_button = document.getElementById("start-circle-button");
const start_dvd_button = document.getElementById("start-dvd-button");
const stop_button = document.getElementById("stop-button");

const radius_lower = 0;
const radius_upper = canvas.width / 2;
let radius_step = 1;
let radius = 10;

const dvd = new Image();
dvd.src = "dvd.png";
const dvd_step = [1, 1];
const dvd_pos = [0, 0];

let animation_id = 0;

// GENERAL CANVAS FUNCTIONS ///////////////////////////////////////////////////

const clear = function(ctx) {
	// clears canvas
	let ret = function(e) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	};
	return ret;
};

const render = function(frame, ctx) {
	// clears canvas, executes frame() on the context
	let ret = function(e) {
		clear(ctx)(e);
		frame(ctx);
	};
	return ret;
};

const animate = function(animation) {
	let ret = function(e) {
		window.cancelAnimationFrame(animation_id);
		animation(e);
		animation_id = window.requestAnimationFrame(animate(animation));
	};
	return ret;
};

const stop_anim = function(e) {
	if (animation_id) {
		window.cancelAnimationFrame(animation_id);
	}
};

// FRAMES AND ANIMATIONS //////////////////////////////////////////////////////

const circle = function(radius) {
	// renders a circle on the canvas, centered at the middle of the canvas
	let ret = function(ctx) {
		ctx.beginPath();
		ctx.arc(canvas.height / 2, canvas.width / 2, radius, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.fill();
	};
	return ret;
};

const draw_image = function(image, pos) {
	let ret = function(ctx) {
		ctx.drawImage(image, pos[0], pos[1]);
	};
	return ret;
};

const step_circle = function(ctx) {
	let ret = function(e) {
		if (radius_step > 0) {
			if (radius == radius_upper) {
				radius_step = -radius_step;
			}
		}
		else {
			if (radius == radius_lower) {
				radius_step = -radius_step
			}
		}
		render(circle(radius += radius_step), ctx)();
	}
	return ret;
};

const step_bounce_box = function(image, pos, delta, canv) {
	let ret = function(e) {
		// extracting information from canvas
		ctx = canv.getContext("2d");
		bounds = [
			[0, canv.width],
			[0, canv.height]
		];

		// rendering image
		render(draw_image(image, pos), ctx)();
		pos[0] += delta[0];
		pos[1] += delta[1];

		// mutating direction
		hits = [
			[pos[0] <= bounds[0][0], pos[0] + image.width >= bounds[0][1]],
			// hit left, right
			[pos[1] <= bounds[1][0], pos[1] + image.height >= bounds[1][1]]
			// hit top, bottom
		];
		if (hits[0][0] || hits[0][1]) {
			delta[0] = -delta[0];
		};
		if (hits[1][0] || hits[1][1]) {
			delta[1] = -delta[1];
		};
	};
	return ret;
};

// START FUNCTIONS ////////////////////////////////////////////////////////////

const start_circle = function(e) {
	console.log("Starting circle animation");
	stop_anim(e)
	radius_step = 1;
	radius = 5;
	animation_id = window.requestAnimationFrame(animate(step_circle(canvas_context)));
};

const start_screensaver = function(e) {
	let randint = function(min, max) {
		return min + Math.floor(Math.random() * (max - min));
	};

	stop_anim(e);
	dvd_step[0] = dvd_step[1] = 1;
	dvd_pos[0] = randint(0, canvas.width - dvd.width);
	dvd_pos[1] = randint(0, canvas.height - dvd.height);

	animation_id = window.requestAnimationFrame(animate(
		step_bounce_box(dvd, dvd_pos, dvd_step, canvas)
	));
};

start_circle_button.addEventListener("click", start_circle);
start_dvd_button.addEventListener("click", start_screensaver);
stop_button.addEventListener("click", stop_anim);