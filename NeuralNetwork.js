/**
 * [NeuralNetwork Neural network used by each mice used to predict the required mouse heading and velocity]
 */
class NeuralNetwork {

  /**
   * [constructor description]
   * @param {[Number, Number]} inWMatDim  [Weights matrix from input to hidden layer]
   * @param {[Number, Number]} outWMatDim [Weights matrix from hidden to output layer]
   */
  constructor(inWMatDim, outWMatDim) {
    this.hiWeights = this.initWeights(inWMatDim[0], inWMatDim[1])
    this.outWeights = this.initWeights(outWMatDim[0], outWMatDim[1])
  }

  /**
   * [initWeights Initializes the weights randomly between -1 and 1]
   * @param  {Number} shapeX [Number of rows]
   * @param  {Number} shapeY [Number of columns]
   * @return {Object}        [description]
   */
  initWeights(shapeX, shapeY) {
    return nj.random([shapeX, shapeY]).multiply(2).subtract(1)
  }

  /**
   * [feedForward Pass the inputs forward in the neural network]
   * @param  {Object} inputs [The input vector composed of the heading to the nearest food]
   * @return {Object}        [The output vector composed of the suggested heading and velocity variation]
   */
  feedForward(inputs) {
    let hi = nj.tanh(nj.dot(this.hiWeights, inputs))
    let out = nj.tanh(nj.dot(hi.T, this.outWeights))
    return nj.tanh(nj.dot(hi.T, this.outWeights))
  }

}
