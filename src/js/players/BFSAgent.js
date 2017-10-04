import Agent from "./Agent"
import BFS from "../search/BFS"
class BFSAgent extends Agent {
  constructor(identifier, maze) {
    super(identifier, new BFS(maze))
  }
}

export default BFSAgent
export { BFSAgent }
