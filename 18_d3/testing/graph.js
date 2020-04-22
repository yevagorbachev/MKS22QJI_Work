// borrows heavily from [ https://www.d3-graph-gallery.com/graph/line_basic.html ]
// GRAPH CONSTANTS
let DATA = [ // testing dataset
	{independent: 0, dependent1: 20, dependent2: 67},
	{independent: 1, dependent1: 50, dependent2: 67},
	{independent: 2, dependent1: 170, dependent2: 22},
	{independent: 3, dependent1: 20, dependent2: 500},
	{independent: 4, dependent1: 70, dependent2: 40},
	{independent: 5, dependent1: 75, dependent2: 45},
	{independent: 6, dependent1: 66, dependent2: 70},
];

const X_PARAM = "independent";
const Y_PARAM = "dependent1";
const WIDTH = 1000;
const HEIGHT = 500;
const MAR = {top: 20, bottom: 20, left: 30, right: 20}; // margains

// D3

const GRAPH = d3.select("#chart-container").append("svg")
	.attr("width", WIDTH + MAR.top + MAR.bottom)
	.attr("height", HEIGHT + MAR.left + MAR.right);
// appends SVG

const limits = {
	x: d3.max(DATA, function(datum) {return datum[X_PARAM]}),
	y: d3.max(DATA, function(datum) {return datum[Y_PARAM]}),
}
console.log(limits.x);
console.log(limits.y);

const scaled_x = function(datum) {return (WIDTH * ( datum[X_PARAM] / limits.x ));};
const scaled_y = function(datum) {return (HEIGHT * ( 1 - datum[Y_PARAM] / limits.y ));};

const generate_axes = function(graph, data) {
	let x_max = d3.max(data, function(entry) {return entry[X_PARAM]});
	let x_scale = d3.scaleLinear() // set x axis scale
		.domain([0, x_max]) // data extent plus padding
		.range([0, WIDTH]); // pixel size

	let y_max = d3.max(data, function(entry) {return entry[Y_PARAM]});
	let y_scale = d3.scaleLinear()
		.domain([0, y_max])
		.range([HEIGHT, 0]); // pixel size is reversed because height is measured from top in HTML

	graph.append("g")
		.attr("transform",`translate(${MAR.left},${HEIGHT + MAR.top})`) // moves axis object to bottom margain
		.call(d3.axisBottom().scale(x_scale)); // scales axis
	graph.append("g")
		.attr("transform",`translate(${MAR.left},${MAR.top})`)
		.call(d3.axisLeft().scale(y_scale));
};

const generate_points = function(graph, data) {

	graph.append("g")
		.attr("class", "lines")
		.attr("transform", `translate(${MAR.left},${MAR.top})`)
		.selectAll("dot").data(data).enter()
		.append("line")
		.attr("x1", scaled_x).attr("x2", scaled_x)
		.attr("y1", scaled_y).attr("y2", scaled_y)
		.style("stroke", "black").style("opacity", 1);
};

const animate_line = function(data) {
	let ret = function(d, index) {
		let line = d3.select(this);
		if (data[index + 1]) {
			scx = scaled_x( data[index + 1] )
			scy = scaled_y( data[index + 1] )
			line.transition()
				.duration(500)
				.delay(index * 500)
				.attr("x2", scx)
				.attr("y2", scy);
		};
	}
	return ret;
}

generate_axes(GRAPH, DATA);
generate_points(GRAPH, DATA);
GRAPH.select(".lines").selectAll("line").each(animate_line(DATA));
