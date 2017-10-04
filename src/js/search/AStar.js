import SearchAlgorithm from "./SearchAlgorithm"

class AStar extends SearchAlgorithm {
  constructor(maze) {
    super(maze)
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
    this.maze.cells[0][0].g = 0
    let fringe = [this.maze.cells[0][0]]
    let searchPath = []
    while(fringe.length > 0) {
      let currentCell = fringe.shift()
      let y = currentCell.y
      let x = currentCell.x
      let cost = currentCell.g + 1
      if (y == yMax && x == xMax) {
        searchPath.push([y, x])
        break
      }
      if (!currentCell.visited) {
        searchPath.push([y, x])
        currentCell.visited = true
        currentCell.neighbors.forEach((coords) => {
          let neighbor = this.maze.cells[y + coords[0]][x + coords[1]]
          if (neighbor.visited || cost >= neighbor.g) {
            return
          } else if (!fringe.includes(neighbor)) {
            fringe.push(neighbor)
          }
          neighbor.g = cost
        })
        fringe.sort((a, b) => a.h + a.g - b.h - b.g)
      }
    }
    console.log(searchPath)
    this.searchPath = searchPath
  }
}

export default AStar
export { AStar }
