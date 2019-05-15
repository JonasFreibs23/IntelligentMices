/**
 * [config All the different parameters used in the simulation]
 * @type {Object}
 */
let config = {
  maxSteps: 400,
  respawn: false,
  maxGenerations: 1000,
  nbMice: 40,
  nbCheese: 40,
  mouseSize: 5,
  cheeseSize: 4,
  mouseMaxSpeed: 1,
  mouseMinSpeed: 0.5,
  elitismPercentage: 0.2,
  mutationRate: 0.1,
  nbHiNodes: 10,
  nnInWMatDim: [10, 1],
  nnOutWMatDim: [10, 2],
  fps: 60,
  chartOptions: {
				scales: {
					yAxes: [{
						scaleLabel: {
							display: true,
							labelString: 'Total eaten cheeses'
						},
						 ticks: {
							min: 0,
						}
					}],
					xAxes: [{
						scaleLabel: {
							display: true,
							labelString: 'Generation'
						}
					}]
				}
			}
}
