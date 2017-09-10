from cell import Cell

""" Class
Name: Grid
Description: Stores a grid environment made up of Cell objects
Fields:
 - width - integer width of grid
 - height - integer height of grid
 - cells - Cell objects for each cell in grid
"""
class Grid(object):

    """ Constructor
    """
    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.cells = [[Cell(y,x) for x in range(width)] for y in range(height)]


    """ Magic method
    """
    def __str__(self):
        return str([map(str, x) for x in self.cells])

    """ JSON conversion convenience function
    """
    def _jsonify(self):
        return {
            "width" : self.width,
            "height" : self.height,
            "cells" : [
                [cell._jsonify() for cell in row]
            for row in self.cells]
        }
