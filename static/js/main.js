var maze = {}
var width = 0, height = 0
var x = 0, y = 0

function create_cell_from_edges(cell) {
  var $cellElem = $("<div/>", {"class": "cell"})

  for (var neighbor of cell.nghbrs) {
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
  var $canvas_old = $('canvas')
  var $canvas = $("<div/>", {id: "canvas"})
  for (var row of maze.cells) {
    var $rowElem = $("<div/>", {"class": "row"})
    for (var cell of row) {
      var $cellElem = create_cell_from_edges(cell)
      $rowElem.append($cellElem)
    }
    $canvas.append($rowElem)
  }
  $canvas.find(".cell").eq(0).addClass("current")
  $(".maze").html($canvas)
}

function request_maze() {
  width = $('[name=width]').val()
  height = $('[name=height]').val()
  $.get('/api/new_maze?' + 'width=' + width + '&height=' + height, function(response) {
    maze = response.maze
    build_maze()
    return true
  })
  return false
}

function move_player(event) {
  console.log("test")
  var currentSquare = $(".cell.current")

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
    case 83:
      if (currentSquare.hasClass("right")) {
        x++
        currentSquare.removeClass("current")
      }
      break
    // bottom
    case 115:
    case 68:
      if (currentSquare.hasClass("bottom")) {
        y++
        currentSquare.removeClass("current")
      }
      break
    default:

  }

  $(".cell").eq(y*width+x).addClass("current")
}

function main() {
  $('form#maze_form').submit(request_maze)
  $(document).on("keypress", move_player)
}

$(document).ready(main)
