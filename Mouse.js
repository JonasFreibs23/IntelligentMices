/**
 * [Mouse Represents a mouse]
 * @extends GraphicalElement
 */
class Mouse extends GraphicalElement {

      /**
       * [constructor]
       * @param {Number} maxX    [Maximum position along the x axis]
       * @param {Number} maxY    [Maximum position along the y axis]
       * @param {Object} context [The canva's context]
       */
      constructor(maxX, maxY, context){
        super(maxX, maxY, config.mouseSize, 'grey')
        this.context = context
        this.init()
        this.net = new NeuralNetwork(config.nnInWMatDim, config.nnOutWMatDim)
      }

      /**
       * [init Initializes the mouse's attributes]
       */
      init() {
        this.initRandomPosition()
        this.v = getRandomInRange(config.mouseMinSpeed, config.mouseMaxSpeed)
        this.distToCheese = dist(0, 0, this.maxX, this.maxY)
        this.alphaNearestFood = 0
        this.alpha = Math.random() * 2 * Math.PI
        this.fitness = 0
      }

      /**
       * [learn Learns whether to change velocity and heading based on the nearest cheese's heading]
       */
      learn() {
        // alphaNearestFood [-pi, pi]
        let out = this.net.feedForward(nj.array([[this.alphaNearestFood]]))
        this.alpha += out.get(0, 0)
        this.alpha = degToRad((radToDeg(this.alpha)) % 360)
        this.v += out.get(0, 1)
        this.v = this.v > config.mouseMaxSpeed ? config.mouseMaxSpeed : this.v
        this.v = this.v < config.mouseMinSpeed ? config.mouseMinSpeed : this.v
      }

      /**
       * [draw Draws the mouse on the simulation's canvas]
       */
      draw() {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false)
        this.context.fillStyle = this.color
        this.context.fill()
        this.context.stroke()
      }

      /**
       * [move Updates the mouse's position based on the velocity and heading]
       * @return {[type]} [description]
       */
      move() {
        this.x += this.v * Math.cos(this.alpha)
        this.y += this.v * Math.sin(this.alpha)
      }

}
