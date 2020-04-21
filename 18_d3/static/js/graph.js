// borrows heavily from [ https://www.d3-graph-gallery.com/graph/line_basic.html ]

let data = [
	{independent: 1, dependent: 50},
	{independent: 2, dependent: 170},
	{independent: 3, dependent: 20},
	{independent: 4, dependent: 70},
	{independent: 5, dependent: 75},
	{independent: 6, dependent: 66},
];
// d3.csv('/data?file=dataset1', function(incoming) {data = incoming;});
const x = 'independent';
const y = 'dependent';

// html objects
const chart = document.getElementById('chart');
const lines = document.getElementById('lines');

