import $ from "jquery"
import Player from "./Player"
import AStar from "./AStar"
import BFS from "./BFS"
import DFS from "./DFS"

let maze = {}
let width = 0, height = 0
let player = new Player()
let agents = []

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
      $cellElem.addClass("bottom")
    }
    else if (neighbor[0] == -1 && neighbor[1] == 0) {
      $cellElem.addClass("top")
    }
  }
  return $cellElem
}

function build_maze() {
  const $canvas = $("<div/>", {id: "canvas"})
  for (let row of maze.cells) {
    let $rowElem = $("<div/>", {class: "row d-flex justify-content-center"})
    for (let cell of row) {
      let $cellElem = create_cell_from_edges(cell)
      $rowElem.append($cellElem)
    }
    $canvas.append($rowElem)
  }
  $canvas.find(".cell").eq(0).addClass("current").addClass("start")
  $canvas.find(".cell").eq(-1).addClass("end")
  $(".maze").html($canvas)
}

function request_maze() {
  width = $('[name=width]').val()
  height = $('[name=height]').val()
  $.get(`/api/new_maze?width=${width}&height=${height}`, function(response) {
    maze = response.maze
    build_maze()
    player.reset()
    agents.length = 0
    agents.push(new DFS(maze), new BFS(maze), new AStar(maze))
    return true
  })
  return false
}

function keyInput(event) {
  switch (event.keyCode) {
    // left
    case 97:
    case 65:
      player.move("left")
      break
    // top
    case 119:
    case 87:
      player.move("up")
      break
    // right
    case 100:
    case 68:
      player.move("right")
      break
    // bottom
    case 115:
    case 83:
      player.move("down")
      break
    case 32:
    case 37:
    case 38:
    case 39:
    case 40:
      event.preventDefault()
      break
    default:

  }
}

function main() {
  $('#maze_form form').submit(request_maze)
  $(document).on("keypress", keyInput)
  $('input[name=theme]').change(toggle_theme)
}

$(document).ready(main)
