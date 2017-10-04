import $ from "jquery"
import Player from "./Player"
class UserPlayer extends Player {
  constructor(identifier) {
    super(identifier)
  }

  move(operation) {
    const currentSquare = $(`.cell.${this.identifier}`)
    let x = this.x
    let y = this.y

    switch (operation) {
      case "left":
        if (currentSquare.hasClass("left")) {
          x--
        }
        break
      case "up":
        if (currentSquare.hasClass("top")) {
          y--
        }
        break
      case "right":
        if (currentSquare.hasClass("right")) {
          x++
        }
        break
      case "down":
        if (currentSquare.hasClass("bottom")) {
          y++
        }
        break
      default:
    }
    super.move(y, x)
  }
}

export default UserPlayer
export { UserPlayer }
