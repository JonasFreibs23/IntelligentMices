class NeuralNetwork {

  constructor(inWMatDim, outWMatDim) {
    this.hiWeights = this.initWeights(inWMatDim[0], inWMatDim[1])
    this.outWeights = this.initWeights(outWMatDim[0], outWMatDim[1])
  }

  initWeights(shapeX, shapeY) {
    return nj.random([shapeX, shapeY]).multiply(2).subtract(1)
  }

  feedForward(inputs) {
    let hi = nj.tanh(nj.dot(this.hiWeights, inputs))
    let out = nj.tanh(nj.dot(hi.T, this.outWeights))
    return nj.tanh(nj.dot(hi.T, this.outWeights))
  }

}
