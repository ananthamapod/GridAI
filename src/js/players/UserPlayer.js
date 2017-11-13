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
    let actions = {
      "left": () => x--,
      "up": () => y--,
      "right": () => x++,
      "down": () => y++
    }

    switch (operation) {
      case "left":
      case "up":
      case "right":
      case "down":
        if (currentSquare.hasClass(operation)) {
          actions[operation]()
        }
        break
      default:
    }
    super.move(y, x)
  }
}

export default UserPlayer
export { UserPlayer }
