// borrows heavily from [ https://www.d3-graph-gallery.com/graph/line_basic.html ]

let DATA = [
	{independent: 1, dependent: 50},
	{independent: 2, dependent: 170},
	{independent: 3, dependent: 20},
	{independent: 4, dependent: 70},
	{independent: 5, dependent: 75},
	{independent: 6, dependent: 66},
];
// d3.csv("/data?file=dataset1", function(incoming) {DATA = incoming;});
const x_param = "independent";
const y_param = "dependent";

// d3 objects
const chart = d3.select("#chart");
const WIDTH = chart.attr("width");
const HEIGHT = chart.attr("height");

console.log(WIDTH);
console.log(HEIGHT);

const axes = function(data) {
	let x = d3.scaleLinear().domain([0, d3.max(data, function(entry) {return entry[x_param]})]).range(0, WIDTH);
	let y = d3.scaleLinear().domain([0, d3.max(data, function(entry) {return entry[y_param]})]).range(0, HEIGHT);
	return [x, y];
};

const update_axes = function(data)

const graph = function(image, dataum) {
	image.append()
};