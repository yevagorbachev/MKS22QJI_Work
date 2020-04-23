// borrows heavily from [ https://www.d3-graph-gallery.com/graph/line_basic.html ]
// GRAPH CONSTANTS

class Graph {
	constructor(width, height, margins, params) {
		this.width = width;
		this.height = height;
		this.margins = margins;
		this.params = params;
		this.display = d3.select("#chart-container").append("svg")
			.attr("width", WIDTH)
			.attr("height", HEIGHT);
	};
};

const domain = function(data, x_param, y_param) {
	return {
		x: d3.extent(data, (datum) => {return datum[x_param]}),
		y: d3.extent(data, (datum) => {return datum[y_param]}),
	};
};

const scale_x = function(domain, graph) {
	let scaler = function(value) {
		let xlen = graph.width - (graph.margins.left + graph.margins.right);
		let xratio = (value[graph.params.x_param] - domain.x[0]) / (domain.x[1] - domain.x[0]);
		return xratio * xlen + graph.margins.left;
	};
	return scaler;
}

const scale_y = function(domain, graph) {
	let scaler = function(value) {
		let ylen = graph.height - (graph.margins.top + graph.margins.bottom);
		let yratio = (value[graph.params.y_param] - domain.y[0]) / (domain.y[1] - domain.y[0]);
		return (1 - yratio) * ylen + graph.margins.top;
	};
	return scaler;
}

const generate_points = function(graph, data, domain) {
	graph.display.append("g")
		.attr("class", "lines")
		.attr("transform", `translate(${graph.margins.left},${graph.margins.top})`)
		.selectAll("dot").data(data).enter()
		.append("line")
		.attr("x1", scale_x(domain, graph)).attr("x2", scale_x(domain, graph))
		.attr("y1", scale_y(domain, graph)).attr("y2", scale_y(domain, graph))
		.style("stroke", "black").style("opacity", 1);
}

const animate_lines = function(graph, data, domain) {
	scx = scale_x(domain, graph);
	scy = scale_y(domain, graph);
	let animate_line = function(d, index) {
		if (data[index + 1]) {
			d3.select(this).transition()
				.duration(200)
				.delay(index * 200)
				.attr("x2", scx(data[index + 1]))
				.attr("y2", scy(data[index + 1]));
		};
	}
	graph.display.select(".lines").selectAll("line").each(animate_line);
}

let DATA = [ // testing dataset
	{independent: 0, dependent1: 20, dependent2: 67},
	{independent: 1, dependent1: 50, dependent2: 67},
	{independent: 2, dependent1: 170, dependent2: 22},
	{independent: 3, dependent1: 20, dependent2: 500},
	{independent: 4, dependent1: 70, dependent2: 40},
	{independent: 5, dependent1: 75, dependent2: 45},
	{independent: 6, dependent1: 66, dependent2: 70},
	{independent: 7, dependent1: 20, dependent2: 67},
	{independent: 8, dependent1: 50, dependent2: 67},
	{independent: 9, dependent1: 170, dependent2: 22},
	{independent: 10, dependent1: 20, dependent2: 500},
	{independent: 11, dependent1: 70, dependent2: 40},
	{independent: 12, dependent1: 75, dependent2: 45},
	{independent: 13, dependent1: 66, dependent2: 70},
];

const X_PARAM = "independent";
const Y_PARAM = "dependent1";
const WIDTH = 1000;
const HEIGHT = 600;
const MARGINS = {top: 20, bottom: 20, left: 30, right: 20}

const GRAPH = new Graph(WIDTH, HEIGHT, MARGINS, {x_param: X_PARAM, y_param: Y_PARAM})
const DOMAIN = domain(DATA, X_PARAM, Y_PARAM);

// let x_max = d3.max(data, function(entry) {return entry[X_PARAM]});
// let x_scale = d3.scaleLinear() // set x axis scale
// 	.domain(DOMAIN.x) // data extent plus padding
// 	.range([0, GRAPH.y]); // pixel size
// let y_max = d3.max(data, function(entry) {return entry[Y_PARAM]});
// let y_scale = d3.scaleLinear()
// 	.domain([0, y_max])
// 	.range([HEIGHT, 0]); // pixel size is reversed because height is measured from top in HTML

// graph.append("g")
// 	.attr("transform",`translate(${MAR.left},${HEIGHT + MAR.top})`) // moves axis object to bottom margain
// 	.call(d3.axisBottom().scale(x_scale)); // scales axis
// graph.append("g")
// 	.attr("transform",`translate(${MAR.left},${MAR.top})`)
// 	.call(d3.axisLeft().scale(y_scale));

generate_points(GRAPH, DATA, DOMAIN);
animate_lines(GRAPH, DATA, DOMAIN);
