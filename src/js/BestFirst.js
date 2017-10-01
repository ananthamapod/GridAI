import SearchAlgorithm from "./SearchAlgorithm"

class BestFirst extends SearchAlgorithm {
  constructor(maze) {
    super(maze)
    console.log("here")
    this.setInitialValues()
    this.setSearchPath()
  }

  h(cell) {
    return Math.sqrt(Math.pow((this.maze.height - cell.y), 2)
      + Math.pow((this.maze.height - cell.x), 2))
  }

  setInitialValues() {
    this.maze.cells.forEach((row) =>
      row.forEach((cell) =>
        cell.h = this.h(cell)
      )
    )
  }

  setSearchPath() {
    const yMax = this.maze.height - 1
    const xMax = this.maze.width - 1
    let fringe = [this.maze.cells[0][0]]
    let searchPath = []
    while(fringe.length > 0) {
      let currentCell = fringe.shift()
      let y = currentCell.y
      let x = currentCell.x
      if (y == yMax && x == xMax) {
        searchPath.push([y, x])
        break
      }
      console.log("something")
      if (!currentCell.visited) {
        searchPath.push([y, x])
        currentCell.visited = true
        fringe.push(...(currentCell.neighbors
          .map((coords) => this.maze.cells[y + coords[0]][x + coords[1]])))
        fringe.sort((a, b) => a.h - b.h)
      }
    }
    console.log(searchPath)
  }
}

export default BestFirst
export { BestFirst }
