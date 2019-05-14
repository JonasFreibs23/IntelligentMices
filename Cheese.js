class Cheese extends GraphicalElement {

  constructor(maxX, maxY, context) {
    super(maxX, maxY, config.cheeseSize, 'yellow')
    this.context = context
    this.initRandomPosition()
  }

  draw() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false)
    this.context.fillStyle = this.color
    this.context.fill()
    this.context.stroke()
  }

  respawn() {
    this.initRandomPosition()
  }

  remove() {
    this.x = -1000
    this.y = -1000
  }

}
