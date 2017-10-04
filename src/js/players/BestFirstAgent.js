import Agent from "./Agent"
import BestFirst from "../search/BestFirst"
class BestFirstAgent extends Agent {
  constructor(identifier, maze) {
    super(identifier, new BestFirst(maze))
  }
}

export default BestFirstAgent
export { BestFirstAgent }
