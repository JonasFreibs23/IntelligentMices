/**
 * [GraphicalElement Base class for elements appearing on the simulation's canvas]
 */
class GraphicalElement {

    /**
     * [constructor]
     * @param {Number} maxX  [Maximum position along the x axis]
     * @param {Number} maxY  [Maximum position along the y axis]
     * @param {Number} size  [The element's size (radius)]
     * @param {String/Hex} color [The element's color]
     */
    constructor(maxX, maxY, size, color) {
      this.maxX = maxX
      this.maxY = maxY
      this.size = size
      this.color = color
    }

    /**
     * [initRandomPosition Set the element at a random position]
     */
    initRandomPosition() {
      this.x = Math.random() * this.maxX
      this.y = Math.random() * this.maxY
    }

}
