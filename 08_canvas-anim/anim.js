const canvas = document.getElementById("canvas");
const canvas_context = canvas.getContext("2d");
const start_button = document.getElementById("start-button");
const stop_button = document.getElementById("stop-button");

const radius_lower = 0;
const radius_upper = canvas.width / 2;
let radius_step = 1;
let radius = 10;

// let running = 0;

let animation_id;

const clear = function(ctx) {
	let ret = function(e) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
	return ret;
}

const render = function(path, ctx) {
	let ret = function(e) {
		clear(ctx)(e);
		ctx.beginPath();
		path(ctx);
		ctx.stroke();
		ctx.fill();
	}
	return ret;
}

const circle = function(radius) {
	let ret = function(ctx) {
		ctx.arc(300, 300, radius, 0, 2 * Math.PI);
	}
	return ret;
}

const next_circle = function(ctx) {
	let ret = function(e) {
		if (radius_step > 0) {
			if (radius == radius_upper) {
				radius_step = -radius_step;
			}
			render(circle(radius += radius_step), ctx)();
		} else {
			if (radius == radius_lower) {
				radius_step = -radius_step
			}
			render(circle(radius += radius_step), ctx)();
		}
	}
	return ret;
}

const animate = function(animation) {
	let ret = function(e) {
		// if (!running) {
		// 	return;
		// }
		window.cancelAnimationFrame(animation_id);
		animation(e);
		animation_id = window.requestAnimationFrame(animate(animation));
	}		
	return ret;
}

const start_anim = function(e) {
	// if (running) {
	// 	return;
	// }
	// running = 1 - running;
	window.requestAnimationFrame(animate(next_circle(canvas_context)));
	return;
}

const stop_anim = function(id) {
	let ret = function(e) {
		// if (running) {
		// 	running = 1 - running;
		// }
		window.cancelAnimationFrame(animation_id);
	}
	return ret;
}

start_button.addEventListener("click", start_anim);
stop_button.addEventListener("click", stop_anim(animation_id));