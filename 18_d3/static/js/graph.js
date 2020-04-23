class Graph {
	constructor(width, height, margins, params) {
		this.width = width;
		this.height = height;
		this.margins = margins;
		this.params = params;
		this.display = d3.select("#chart-container").append("svg")
			.attr("width", width)
			.attr("height", height);
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
};

const scale_y = function(domain, graph) {
	let scaler = function(value) {
		let ylen = graph.height - (graph.margins.top + graph.margins.bottom);
		let yratio = (value[graph.params.y_param] - domain.y[0]) / (domain.y[1] - domain.y[0]);
		return (1 - yratio) * ylen + graph.margins.top;
	};
	return scaler;
};

const generate_points = function(graph, data, domain) {
	graph.display.append("g")
		.attr("class", "lines")
		.selectAll("dot").data(data).enter()
		.append("line")
		.attr("x1", scale_x(domain, graph)).attr("x2", scale_x(domain, graph))
		.attr("y1", scale_y(domain, graph)).attr("y2", scale_y(domain, graph))
		.style("stroke", "black").style("opacity", 1);
};

const animate_lines = function(graph, data, domain) {
	scx = scale_x(domain, graph);
	scy = scale_y(domain, graph);
	let animate_line = function(d, index) {
		if (data[index + 1]) {
			d3.select(this).transition()
				.duration(10)
				.delay(index * 10)
				.attr("x2", scx(data[index + 1]))
				.attr("y2", scy(data[index + 1]));
		};
	}
	graph.display.select(".lines").selectAll("line").each(animate_line);
};