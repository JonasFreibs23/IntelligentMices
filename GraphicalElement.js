class GraphicalElement {

    constructor(maxX, maxY, size, color) {
      this.maxX = maxX
      this.maxY = maxY
      this.size = size
      this.color = color
    }

    initRandomPosition() {
      this.x = Math.random() * this.maxX
      this.y = Math.random() * this.maxY
    }

}
