import $ from "jquery"

let maze = {}
let width = 0, height = 0
let x = 0, y = 0

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
  $.get('/api/new_maze?' + 'width=' + width + '&height=' + height, function(response) {
    x = y = 0
    maze = response.maze
    build_maze()
    return true
  })
  return false
}

function move_player(event) {
  const currentSquare = $(".cell.current")

  switch (event.keyCode) {
    // left
    case 97:
    case 65:
      if (currentSquare.hasClass("left")) {
        x--
        currentSquare.removeClass("current")
      }
      break
    // top
    case 119:
    case 87:
      if (currentSquare.hasClass("top")) {
        y--
        currentSquare.removeClass("current")
      }
      break
    // right
    case 100:
    case 68:
      if (currentSquare.hasClass("right")) {
        x++
        currentSquare.removeClass("current")
      }
      break
    // bottom
    case 115:
    case 83:
      if (currentSquare.hasClass("bottom")) {
        y++
        currentSquare.removeClass("current")
      }
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

  $(".cell").eq(y*width+x).addClass("current")
}

function main() {
  $('#maze_form form').submit(request_maze)
  $(document).on("keypress", move_player)
  $('input[name=theme]').change(toggle_theme)
}

$(document).ready(main)
