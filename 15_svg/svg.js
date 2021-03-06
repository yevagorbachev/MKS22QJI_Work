//refactored-fiesta - Yevgeniy Gorbachev & Junhee Lee
//SoftDev pd1
//K14 -- Ask Circles [Change || Die] While Moving, etc.
//2020-03-31

//initialization
const image = document.getElementById("vimage")
const clear_button = document.getElementById("clear")
const move_button = document.getElementById("move")
const extra_button = document.getElementById("xtra")

const w3svg = "http://www.w3.org/2000/svg"
const DOT_RADIUS_DEFAULT = 15
let DOT_RADIUS = DOT_RADIUS_DEFAULT
const DOT_COLOR_0 = "black"
const DOT_COLOR_1 = "red"

let bbox = image.getBoundingClientRect()
const bounds = [
	[DOT_RADIUS, bbox.width - DOT_RADIUS],
	[DOT_RADIUS, bbox.height - DOT_RADIUS]
]
const origin = [bbox.left + DOT_RADIUS, bbox.top + DOT_RADIUS]
let deltas = []
animation_id = 0

// ANIMATION INFRASTRUCTURE
const animate = function(animation) {
	let ret = function(e) {
		window.cancelAnimationFrame(animation_id)
		animation(e)
		animation_id = window.requestAnimationFrame(animate(animation))
	}
	return ret
}

const stop_anim = function(e) {
	if (animation_id) {
		window.cancelAnimationFrame(animation_id)
	}
}

const step_bounce_box = function(element, delta) {
	// step a frame for a single box
	pos = [parseInt(element.getAttribute("cx")), parseInt(element.getAttribute("cy"))]

	hits = [
		[pos[0] <= bounds[0][0], pos[0] >= bounds[0][1]],
		[pos[1] <= bounds[1][0], pos[1] >= bounds[1][1]]
	]

	if (hits[0][0] || hits[0][1]) {
		delta[0] = -delta[0]
	}
	if (hits[1][0] || hits[1][1]) {
		delta[1] = -delta[1]
	}

	element.setAttribute("cx", pos[0] + delta[0])
	element.setAttribute("cy", pos[1] + delta[1])
}

const frame = function(e) {
	// step animation
	dots = image.children
	for (let i = 0; i < dots.length; i++) {
		step_bounce_box(dots[i], deltas[i])
	}
}

// CLICK ACTIONS
const dot = function(x, y) {
	// create dot at x,y
	let circle = document.createElementNS(w3svg, "circle")
	circle.setAttribute("cx", x)
	circle.setAttribute("cy", y)
	circle.setAttribute("r", DOT_RADIUS)
	circle.setAttribute("fill", DOT_COLOR_0)
	return circle
}

const new_pos = function(i) {
	return Math.floor(Math.random() * (bounds[i][1] - bounds[i][0])) + origin[i]
}

const mutate = function(mode) {
	// mutate a dot according to mode
	let ret = function(e) {
		if (mode) {
			this.removeEventListener("click", mutate(1))
			this.setAttribute("cx", new_pos(0))
			this.setAttribute("cy", new_pos(1))
			this.setAttribute("fill", DOT_COLOR_0)
			this.addEventListener("click", mutate(0))
		}
		else {
			this.removeEventListener("click", mutate(0))
			this.setAttribute("fill", DOT_COLOR_1)
			this.addEventListener("click", mutate(1))
		}
	}
	return ret
}

const draw = function(e) {
	// if the click is on the SVG image, generate a dot there
	if (e.target == image) {
		new_dot = dot(e.offsetX, e.offsetY)
		new_dot.addEventListener("click", mutate(0))
		image.appendChild(new_dot)
		deltas[deltas.length] = [1,1]
	}
}

const erase = function(e) {
	// erase
	deltas = []
	while (image.firstChild) {
		image.removeChild(image.firstChild)
	}
	DOT_RADIUS = DOT_RADIUS_DEFAULT
}

const extra = function(e) {
	DOT_RADIUS = Math.floor(Math.random() * 25) + 5;
}

image.addEventListener("click", draw)
move_button.addEventListener("click", animate(frame))
clear_button.addEventListener("click", erase)
extra_button.addEventListener("click", extra)