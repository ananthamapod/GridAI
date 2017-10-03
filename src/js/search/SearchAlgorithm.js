class SearchAlgorithm {
  constructor(maze) {
    this.maze = JSON.parse(JSON.stringify(maze))
    this.maze.cells.forEach((row, rowNum) =>
      row.forEach((cell, columnNum) => {
        cell.visited = false
        cell.h = Infinity
        cell.g = Infinity
        cell.y = rowNum
        cell.x = columnNum
      })
    )
  }
}

export default SearchAlgorithm
export { SearchAlgorithm }
