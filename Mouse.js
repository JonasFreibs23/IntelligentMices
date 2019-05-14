class Mouse extends GraphicalElement {

      constructor(maxX, maxY, context){
        super(maxX, maxY, config.mouseSize, 'grey')
        this.context = context
        this.init()
        this.net = new NeuralNetwork(config.nnInWMatDim, config.nnOutWMatDim)
      }

      init() {
        this.initRandomPosition()
        this.v = getRandomInRange(config.mouseMinSpeed, config.mouseMaxSpeed)
        this.distToCheese = dist(0, 0, this.maxX, this.maxY)
        this.alphaNearestFood = 0
        this.alpha = Math.random() * 2 * Math.PI
        this.fitness = 0
      }

      learn() {
        // alphaNearestFood [-pi, pi]
        let out = this.net.feedForward(nj.array([[this.alphaNearestFood]]))
        this.alpha += out.get(0, 0)
        this.alpha = degToRad((radToDeg(this.alpha)) % 360)
        this.v += out.get(0, 1)
        this.v = this.v > config.mouseMaxSpeed ? config.mouseMaxSpeed : this.v
        this.v = this.v < config.mouseMinSpeed ? config.mouseMinSpeed : this.v
      }

      draw() {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false)
        this.context.fillStyle = this.color
        this.context.fill()
        this.context.stroke()
      }

      move() {
        this.x += this.v * Math.cos(this.alpha)
        this.y += this.v * Math.sin(this.alpha)
      }

}
