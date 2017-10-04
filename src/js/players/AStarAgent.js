import Agent from "./Agent"
import AStar from "../search/AStar"
class AStarAgent extends Agent {
  constructor(identifier, maze) {
    super(identifier, new AStar(maze))
  }
}

export default AStarAgent
export { AStarAgent }
