var maze = {}

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
  $canvas_old.replaceWith($canvas)
}

function request_maze() {
  var width = $('[name=width]').val()
  var height = $('[name=height]').val()
  $.get('/new_maze?' + 'width=' + width + '&height=' + height, function(response) {
    maze = response.maze
    build_maze()
    return true
  })
  return false
}

function main() {
  $('form#maze_form').submit(request_maze)
}

$(document).ready(main)
