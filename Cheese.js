/**
 * [Cheese Represents a cheese that spawn on the field]
 * @extends GraphicalElement
 */
class Cheese extends GraphicalElement {

  /**
   * [constructor description]
   * @param {Number} maxX    [Maximum possible position on the x axis]
   * @param {Number} maxY    [Maximum possible position on the y axis]
   * @param {Object} context [The canva's context]
   */
  constructor(maxX, maxY, context) {
    super(maxX, maxY, config.cheeseSize, 'yellow')
    this.context = context
    this.initRandomPosition()
  }

  /**
   * [draw Draws the cheese on the given context]
   */
  draw() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false)
    this.context.fillStyle = this.color
    this.context.fill()
    this.context.stroke()
  }

  /**
   * [respawn Inits randomly a new position]
   */
  respawn() {
    this.initRandomPosition()
  }

  /**
   * [remove Removes the cheese from the simulation setting it offscreen]
   */
  remove() {
    this.x = -1000
    this.y = -1000
  }

}
