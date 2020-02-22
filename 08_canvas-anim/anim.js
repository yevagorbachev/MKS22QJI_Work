const canvas = document.getElementById("canvas");
const canvas_context = canvas.getContext("2d");
const start_button = document.getElementById("start-button");
const stop_button = document.getElementById("stop-button");

const canvas_bounds = [[0,canvas.width], [0,canvas.height]];

const radius_lower = 0;
const radius_upper = canvas.width / 2;
let radius_step = 1;
let radius = 10;

const dvd = new Image();
dvd.src = "dvd.png";
let dvd_step = [1, 1];
let dvd_pos = [0, 0];

let animation_id;

const clear = function(ctx) {
	let ret = function(e) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
	return ret;
}

const render = function(frame, ctx) {
	let ret = function(e) {
		clear(ctx)(e);
		frame(ctx);
	}
	return ret;
}

const circle = function(radius) {
	let ret = function(ctx) {
		ctx.beginPath();
		ctx.arc(300, 300, radius, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.fill();
	}
	return ret;
}

const animate = function(animation) {
	let ret = function(e) {
		window.cancelAnimationFrame(animation_id);
		animation(e);
		animation_id = window.requestAnimationFrame(animate(animation));
	}		
	return ret;
}

const start_anim = function(animation) {
	let ret = function(e) {
		animation_id = window.requestAnimationFrame(animate(animation));
	}
	return ret;
}

const stop_anim = function(e) {
	window.cancelAnimationFrame(animation_id);
}

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
}

const step_bounce_box = function(image, bounds, pos, delta, ctx) {
	let ret = function(e) {
		// hitting top
		if (pos[0] == bounds[0]) {

		}
	}
	return ret;
}

// start_button.addEventListener("click", start_anim(step_circle(canvas_context)));
// stop_button.addEventListener("click", stop_anim);
// canvas_context.beginPath();

window.onload = function() {
	window.requestAnimationFrame(render(image, canvas_context));
}
// canvas_context.stroke();
// canvas_context.fill();
