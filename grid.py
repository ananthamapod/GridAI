from cell import Cell
    # enqueue => append
    # dequeue => popleft

""" Class
Name: Grid
Description: Stores a grid environment made up of Cell objects
Fields:
 - width - integer width of grid
 - height - integer height of grid
 - cells - Cell objects for each cell in grid
Functions:
 - generate_maze - build maze in grid
"""
class Vertex(object):
    """ Constructor
    """
    def __init__(self, x, y):
        self.x = x
        self.y = y


    """ Magic method
    """
    def __str__(self):
        return '('+str(self.x)+','+str(self.y)+')'


    """ Magic method
    """
    def __hash__(self):
        return self.x*100+self.y


""" Class
Name: Edge
Description: Graph edge in grid
Fields:
 - v1 - vertex object at one end of the edge
 - v2 - vertex object at the other end of the edge
 - weight - weight of the edge
Functions:
 - only the magic functions
"""
class Edge(object):
    """ Constructor
    """
    def __init__(self, v1, v2, weight=0):
        self.vertices = {v1,v2}
        self.weight = weight


    """ Magic method
    """
    def __eq__(self, other):
        return self.vertices^other.vertices == set()


    """ Magic method
    """
    def __hash__(self):
        return reduce(lambda x,y: hash(x)*hash(y), self.vertices)


    """ Magic method
    """
    def __str__(self):
        return '[Edge:' + reduce(lambda x,y: str(x)+','+str(y), self.vertices)+', weight:'+str(self.weight)+']'


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
