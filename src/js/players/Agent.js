import Player from "./Player"
class Agent extends Player {
  constructor(identifier, algorithm) {
    super(identifier)
    this.algorithm = algorithm
    this.currentPosition = 0
  }

  next() {
    let position = this.algorithm.searchPath[this.currentPosition]
    if (this.currentPosition < this.algorithm.searchPath.length - 1) {
      this.currentPosition++
    }
    return position
  }

  move() {
    const nextPosition = this.next()
    super.move(...nextPosition)
  }
}

export default Agent
export { Agent }
