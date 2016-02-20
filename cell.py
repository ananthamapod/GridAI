""" Class
Name: Grid
Description: Stores a grid environment made up of Cell objects
Fields:
 - filled - whether the cell is an obstacle, for use in certain environments
 - x, y - coordinates within the associated Grid
 - visited - for usage in search traversals if done later
 - neighbors - list of neighbors, edge representation
 - g - path cost value, for use in search algs
 - h - heuristic value, for use in search algs
Functions:
 - generate_maze - build maze in grid
"""
class Cell(object):
    """ Constructor
    """
    def __init__(self, x, y):
        self.filled = False
        self.x = x
        self.y = y
        self.visited = False
        self.neighbors = []
        self.g = 0
        self.h = 0


    """ Getter, returns fill status of a cell
    """
    def isFilled(self):
        return self.filled


    """ Magic method
    """
    def __eq__(self, other):
        return self.x == other.x and self.y == other.y


    """ Magic method
    """
    def __str__(self):
        return str(self.filled)


    """ Magic method
    """
    def __hash__(self):
        return "-".join([self.x, self.y, self.filled])
