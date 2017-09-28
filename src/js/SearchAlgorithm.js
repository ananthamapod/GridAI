class SearchAlgorithm {
  constructor(maze) {
    this.maze = JSON.parse(JSON.stringify(maze))
    this.maze.cells.forEach((row) =>
      row.forEach((cell) =>
        cell.visited = false
      )
    )
  }
}

export default SearchAlgorithm
export { SearchAlgorithm }
