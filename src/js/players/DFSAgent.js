import Agent from "./Agent"
import DFS from "../search/DFS"
class DFSAgent extends Agent {
  constructor(identifier, maze) {
    super(identifier, new DFS(maze))
  }
}

export default DFSAgent
export { DFSAgent }
