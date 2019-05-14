class Simulator {

  constructor(canvas, pubSub, withGA) {
      this.canvas = canvas
      this.pubSub = pubSub
      this.withGA = withGA
      this.generation = 0
      this.pubSub.publish('generation', this.generation)
      this.steps = 0
      this.context = this.canvas.getContext('2d')
      this.nbMice = config.nbMice
      this.nbCheese = config.nbCheese
      this.mice = []
      this.cheeses = []
      this.GA = new GeneticAlgorithm(this.canvas)
      this.maxStep = config.maxSteps
      this.maxGeneration = config.maxGenerations
      this.eatenCheese = 0
      this.initMice()
      this.initCheeses()
  }

  initMice() {
      for(let i = 0; i < this.nbMice; i++){
        this.mice.push(new Mouse(this.canvas.width, this.canvas.height, this.context))
      }
  }

  initCheeses(){
    for(let i = 0; i < this.nbCheese; i++){
      this.cheeses.push(new Cheese(this.canvas.width, this.canvas.height, this.context))
    }
  }

  refreshDisplay() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let mouse of this.mice) {
      mouse.draw()
    }

    for (let cheese of this.cheeses) {
      cheese.draw()
    }
  }

  run() {
    if(this.generation < this.maxGeneration) {
      this.steps = 0
      this.simulate()
      if(this.withGA) {
        this.mice = this.GA.evolve([...this.mice])
        this.generation++
      }
      else{
        this.mice.forEach(mice => mice.init())
      }
      this.pubSub.publish('stat', [this.generation, this.eatenCheese])
      this.pubSub.publish("generation", this.generation)
      this.eatenCheese = 0
      this.cheeses = []
      this.initCheeses()
    }
  }

  simulate() {
    this.mice.forEach(mouse => mouse.move())

    this.refreshDisplay()

    // Compute fitness
    for(let mouse of this.mice) {
      let idx = 0
      for(let cheese of this.cheeses) {
        let distToCheese = dist(mouse.x, mouse.y, cheese.x, cheese.y)
        if(distToCheese < config.mouseSize + config.cheeseSize) {
          if(config.respawn){
            cheese.respawn()
          }
          else{
            this.cheeses = this.cheeses.filter((value, index, arr) => index !== idx)
          }
          this.eatenCheese++
          mouse.fitness++
        }
        idx++
      }
    }

    // Compute heading
    for(let mouse of this.mice) {
      for(let cheese of this.cheeses) {
        let distToCheese = dist(mouse.x, mouse.y, cheese.x, cheese.y)
        if(distToCheese < mouse.distToCheese) {
          mouse.distToCheese = distToCheese
          mouse.alphaNearestFood = computeDirectionToNearestFood(mouse, cheese)
        }
      }
    }

    this.pubSub.publish("steps", this.steps++)

    // Mouse learn how to get a cheese
    this.mice.forEach(mouse => mouse.learn())

    if(this.steps < this.maxStep) {
        setTimeout(() => {
          this.simulate()
        }, 1000 / config.fps)
    }
    else{
      this.run()
    }
  }

}
