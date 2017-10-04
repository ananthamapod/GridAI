import SearchAlgorithm from "./SearchAlgorithm"

class BFS extends SearchAlgorithm {
  constructor(maze) {
    super(maze)
    this.setSearchPath()
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
      if (!currentCell.visited) {
        searchPath.push([y, x])
        currentCell.visited = true
        fringe.push(...(currentCell.neighbors
          .map((coords) => this.maze.cells[y + coords[0]][x + coords[1]])))
      }
    }
    console.log(searchPath)
    this.searchPath = searchPath
  }
}

export default BFS
export { BFS }
