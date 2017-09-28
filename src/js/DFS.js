import SearchAlgorithm from "./SearchAlgorithm"

class DFS extends SearchAlgorithm {
  constructor(maze) {
    super(maze)
    this.setSearchPath()
  }

  setSearchPath() {
    const yMax = this.maze.height - 1
    const xMax = this.maze.width - 1
    let fringe = [[0,0]]
    let searchPath = []
    let currentCell = undefined
    while(fringe.length > 0) {
      let coords = fringe.pop()
      let y = coords[0]
      let x = coords[1]
      if (y == yMax && x == xMax) {
        searchPath.push(coords)
        break
      }
      currentCell = this.maze.cells[y][x]
      if (!currentCell.visited) {
        searchPath.push(coords)
        currentCell.visited = true
        fringe.push(...(currentCell.neighbors.map(elem => [y + elem[0], x + elem[1]])))
      }
    }
    console.log(searchPath)
  }
}

export default DFS
export { DFS }
