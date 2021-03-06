import $ from "jquery"
import UserPlayer from "./players/UserPlayer"
import BFSAgent from "./players/BFSAgent"
import DFSAgent from "./players/DFSAgent"
import BestFirstAgent from "./players/BestFirstAgent"
import AStarAgent from "./players/AStarAgent"

const MODES = {CASUAL: 0, TIMED: 1, HYPERTIME: 2}
Object.keys(MODES).forEach((mode) => MODES[mode.toLowerCase()] = MODES[mode])
let maze = {}
let width = 0, height = 0
let player = new UserPlayer("current")
let agents = []
let mode = MODES.CASUAL
let playerMove = undefined
let intervalId = undefined

function toggle_theme() {
  if($(this).is(":checked")) {
    $('body').addClass("theme-dark")
  } else {
    $('body').removeClass("theme-dark")
  }
}

function create_cell_from_edges(cell) {
  let $cellElem = $("<div/>", {"class": "cell"})

  for (let neighbor of cell.neighbors) {
    if (neighbor[0] == 0 && neighbor[1] == 1) {
      $cellElem.addClass("right")
    }
    else if (neighbor[0] == 0 && neighbor[1] == -1) {
      $cellElem.addClass("left")
    }
    else if (neighbor[0] == 1 && neighbor[1] == 0) {
      $cellElem.addClass("down")
    }
    else if (neighbor[0] == -1 && neighbor[1] == 0) {
      $cellElem.addClass("up")
    }
  }
  return $cellElem
}

function build_maze() {
  const $canvas = $("<div/>", {id: "canvas"})
  for (let row of maze.cells) {
    let $rowElem = $("<div/>", {class: "row justify-content-center"})
    for (let cell of row) {
      let $cellElem = create_cell_from_edges(cell)
      $rowElem.append($cellElem)
    }
    $canvas.append($rowElem)
  }
  $canvas.find(".cell").eq(0)
    .addClass("current")
    .addClass("bfs")
    .addClass("dfs")
    .addClass("bestfirst")
    .addClass("astar")
    .addClass("start")
  $canvas.find(".cell").eq(-1).addClass("end")
  $(".maze").html($canvas)
}

function resetQuantities() {
  player.reset()
  playerMove = undefined
  agents.length = 0
  if (intervalId) {
    clearInterval(intervalId)
  }
  agents.push(new DFSAgent("dfs", maze),
    new BFSAgent("bfs", maze),
    new BestFirstAgent("bestfirst", maze),
    new AStarAgent("astar", maze)
  )
}

function move() {
  player.move(playerMove)
  agents.forEach((agent) => agent.move())
  playerMove = undefined
}

function request_maze() {
  width = $('[name=width]').val()
  height = $('[name=height]').val()
  if(checkDimensions(width, height)) {
    mode = MODES[$('[name=mode]:checked').val()] || MODES.CASUAL
    $.get(`/api/new_maze?width=${width}&height=${height}`, function(response) {
      maze = response.maze
      build_maze()

      resetQuantities()
      if (mode != MODES.CASUAL) {
        intervalId = setInterval(() => {
          move()
          if(player.x == width - 1 && player.y == height - 1) {
            clearInterval(intervalId)
          }
        }, mode == MODES.TIMED? 1000 : 250)
      }
      return true
    })
  }
  return false
}

function checkDimensions(width, height) {
  if (width > 100 || height > 100) {
    alert("Hey, for sanity, keep the maximum dimensions at 100 ☺")
    return false
  }
  return true
}

function keyInput(event) {
  switch (event.keyCode) {
    case 37: case 65:
      playerMove = "left"
      break
    case 38: case 87:
      playerMove = "up"
      break
    case 39: case 68:
      playerMove = "right"
      break
    case 40: case 83:
      playerMove = "down"
      break
    case 32:
      event.preventDefault()
    default:
      return
  }
  event.preventDefault()

  if (mode == MODES.CASUAL) {
    move()
  }
}

function main() {
  $('#maze_form form').submit(request_maze)
  $(document).on("keydown", keyInput)
  $('input[name=theme]').change(toggle_theme)
}

$(document).ready(main)
