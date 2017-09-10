from functools import reduce

""" Class
Name: Vertex
Description: High level Cell abstraction
Fields:
 - x, y - coordinates within the associated Grid
Functions:
 - only the magic functions
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

