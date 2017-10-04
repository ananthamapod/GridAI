import $ from "jquery"
class Player {
  constructor(identifier) {
    this.identifier = identifier
    this.reset()
  }

  reset() {
    this.x = 0
    this.y = 0
  }

  move(y, x) {
    this.x = x
    this.y = y
    const currentSquare = $(`.cell.${this.identifier}`)
    currentSquare.removeClass(this.identifier)
    $("#canvas .row").eq(this.y).find(".cell").eq(this.x).addClass(this.identifier)
  }
}

export default Player
export { Player }
