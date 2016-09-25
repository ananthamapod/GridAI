var maze = {}

function create_cell_from_edges(cell) {
  var cellElem = document.createElement("div")
  cellElem.className = "cell"

  for (var neighbor of cell.nghbrs) {
    if (neighbor[0] == 0 && neighbor[1] == 1) {
      cellElem.className += " right"
    }
    else if (neighbor[0] == 0 && neighbor[1] == -1) {
      cellElem.className += " left"
    }
    else if (neighbor[0] == 1 && neighbor[1] == 0) {
      cellElem.className += " bottom"
    }
    else if (neighbor[0] == -1 && neighbor[1] == 0) {
      cellElem.className += " top"
    }
  }
  return cellElem
}

function build_maze() {
  var canvas = document.getElementById('canvas')
  for (var row of maze.cells) {
    var rowElem = document.createElement("div")
    rowElem.className = "row"
    for (var cell of row) {
      var cellElem = create_cell_from_edges(cell)
      rowElem.appendChild(cellElem)
    }
    document.body.appendChild(rowElem)
  }
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
