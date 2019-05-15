/**
 * [GeneticAlgorithm Performs a genetic algorithm on a mouse population]
 */
class GeneticAlgorithm {

  /**
   * [constructor]
   * @param {Object} canvas [The simulation's canvas]
   */
  constructor(canvas) {
    this.canvas = canvas
    this.elitismPercentage = config.elitismPercentage
    this.mutationRate = config.mutationRate
    this.i = 0
  }

  /**
   * [evolve Evolves a mice population using the best fitting mice from the previous population]
   * @param  {Object} mice [The current mice generation to be evolved]
   * @return {Array[Object]}      [The next mice generation]
   */
  evolve(mice) {
    let elitism = Math.floor(this.elitismPercentage * mice.length)
    let nbNewMouse = mice.length - elitism

    // Sort mice by fitness
    mice.sort((mouseOne, mouseTwo) => parseInt(mouseTwo.fitness) - parseInt(mouseOne.fitness))

    // Keep fitest mice
    let newMice = []
    for(let i = 0; i < elitism; i++) {
      mice[i].init()
      newMice.push(mice[i])
    }

    // Generate new mice
    for(let i = 0; i < nbNewMouse; i++) {
      // Truncate selection
      let rndSample = getRandomSampleFromArray(mice, 2)
      let rndMouseA = rndSample[0]
      let rndMouseB = rndSample[1]

      // Crossover
      let crossoverWeight = Math.random()
      let hiWeights = rndMouseA.net.hiWeights.multiply(crossoverWeight).add(rndMouseB.net.hiWeights.multiply(1 - crossoverWeight))
      let outWeights = rndMouseA.net.outWeights.multiply(crossoverWeight).add(rndMouseB.net.outWeights.multiply(1 - crossoverWeight))

      // Mutation
      let mutation = Math.random()
      if (mutation <= this.mutationRate) {
        let pickedMat = Math.random() < 0.5 ? 0 : 1
        if (pickedMat == 0) {
          let indexRow = Math.floor(Math.random() * hiWeights.length)
          hiWeights.set(indexRow, 0, nj.multiply(hiWeights.get(indexRow, 0), getRandomInRange(0.9, 1.1)).get(0, 0))
          hiWeights.set(indexRow, 0, hiWeights.get(indexRow, 0) > 1 ? 1 : hiWeights.get(indexRow, 0))
          hiWeights.set(indexRow, 0, hiWeights.get(indexRow, 0) < -1 ? -1 : hiWeights.get(indexRow, 0))
        }

        if (pickedMat == 1) {
          let indexRow = Math.floor(Math.random() * outWeights.shape[1])
          let indexCol = Math.floor(Math.random() * outWeights.shape[0])
          outWeights.set(indexRow, indexCol, nj.multiply(outWeights.get(indexRow, indexCol), getRandomInRange(0.9, 1.1)).get(0, 0))
          outWeights.set(indexRow, indexCol, outWeights.get(indexRow, indexCol) > 1 ? 1 : outWeights.get(indexRow, indexCol))
          outWeights.set(indexRow, indexCol, outWeights.get(indexRow, indexCol) < -1 ? -1 : outWeights.get(indexRow, indexCol))
        }
      }

      // Add the new mouse to the next generation
      let mouse = new Mouse(this.canvas.width, this.canvas.height, this.canvas.getContext('2d'))
      mouse.net.hiWeights = hiWeights
      mouse.net.outWeights = outWeights
      newMice.push(mouse)
    }

    return newMice
  }

}
