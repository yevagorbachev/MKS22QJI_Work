
console.log("executing graph.js");

let data = [
	{independent: 1, dependent: 50},
	{independent: 2, dependent: 170},
	{independent: 3, dependent: 20},
	{independent: 4, dependent: 70},
	{independent: 5, dependent: 75},
	{independent: 6, dependent: 66},
];

d3.csv('/data?file=dataset1', function(incoming) {console.log(incoming)});

// const x = 'independent';
// const y = 'dependent';

// html objects

