import $ from "jquery"
class Player {
  constructor() {
    this.reset()
  }

  reset() {
    this.x = 0
    this.y = 0
  }

  move(operation) {
    const currentSquare = $(".cell.current")

    switch (operation) {
      case "left":
        if (currentSquare.hasClass("left")) {
          this.x--
          currentSquare.removeClass("current")
        }
        break
      case "up":
        if (currentSquare.hasClass("top")) {
          this.y--
          currentSquare.removeClass("current")
        }
        break
      case "right":
        if (currentSquare.hasClass("right")) {
          this.x++
          currentSquare.removeClass("current")
        }
        break
      case "down":
        if (currentSquare.hasClass("bottom")) {
          this.y++
          currentSquare.removeClass("current")
        }
        break
      default:
    }
    $("#canvas .row").eq(this.y).find(".cell").eq(this.x).addClass("current")
  }
}

export default Player
export { Player }
