from grid import Grid
from graphutils import Edge, Vertex
from random import randint
from collections import deque

""" Class
Name: Maze
Description: Subclass of Grid, maze environment
    Generates maze based on building a spanning tree. Constructs
    temporary graph of grid, generates randomly weighted edges, applies
    Kruskal's algorithm to generate spanning tree. Applies the spanning
    tree edges to current cells in self
Fields:
 - width - integer width of grid
 - height - integer height of grid
 - cells - Cell objects for each cell in grid
"""
class Maze(Grid):
    """ Constructor
    """
    def __init__(self, width, height):
        super().__init__(width, height)
        ### vertices
        vertices = [[Vertex(x,y) for x in range(self.width)] for y in range(self.height)]
        ### edges
        edges = self.__populate_edges_(vertices)

        ### union sets
        vertex_sets = set()
        ### path
        path = []
        count = 1
        total = self.height*self.width

        # run Kruskal's until all vertices are connected
        while count < total:
            edge = edges.popleft()
            curr_vs = list(edge.vertices)
            v_set1 = self.__find_set_of_occurrence_(curr_vs[0], vertex_sets)
            v_set2 = self.__find_set_of_occurrence_(curr_vs[1], vertex_sets)

            # would cause a cycle, ignore
            if v_set1 == v_set2:
                continue

            # remove the sets if they exist in the current group
            for i in (v_set1, v_set2):
                try:
                    vertex_sets.remove(frozenset(i))
                except KeyError:
                    pass
            # add back the unioned set
            vertex_sets.add(frozenset(v_set1|v_set2))
            path.append(edge)
            count += 1

        # put maze edges into grid
        self.__map_out_maze_through_vertices_(path)


    """ Function
    Name: map_out_maze_through_vertices (Private)
    Inputs: path - List[Edge]
    Description: Goes through path and adds each edge in path as
    part of appropriate vertices' neighbors
    """
    def __map_out_maze_through_vertices_(self, path):
        for edge in path:
            vs = list(edge.vertices)
            v1 = self.cells[vs[0].y][vs[0].x]
            v2 = self.cells[vs[1].y][vs[1].x]
            v1.neighbors.append((vs[1].y-vs[0].y, vs[1].x-vs[0].x))
            v2.neighbors.append((vs[0].y-vs[1].y, vs[0].x-vs[1].x))


    """ Function
    Name: find_set_of_occurrence (Private)
    Inputs: v - Vertex
    Outputs: sets - Set of vertex sets
    Description: Looks through sets of connected vertices and finds the set of a particular vertex
    if no set contains the vertex, returns a set consisting of just that vertex
    """
    def __find_set_of_occurrence_(self, v, sets):
        for s in sets:
            if v in s:
                return frozenset(s)
        return frozenset([v])


    """ Function
    Name: populate_edges (Private)
    Inputs: vertices - List[List[Vertex]]
    Outputs: edges - Double-ended queue of graph edges
    Description: Loops through vertices and generates randomly weighted edges
    for fully connected graph
    """
    def __populate_edges_(self, vertices):
        ### edges
        edges = set()
        # builds a list of edges with random weights, where edges are not duplicated
        # Note: no edge is tied to any particular vertex
        for y in range(self.height):
            for x in range(self.width):
                v = vertices[y][x]
                if y > 0:
                    edges.add(self.__generate_random_weight_edge_(v, vertices[y-1][x]))
                if y < self.height-1:
                    edges.add(self.__generate_random_weight_edge_(v, vertices[y+1][x]))
                if x > 0:
                    edges.add(self.__generate_random_weight_edge_(v, vertices[y][x-1]))
                if x < self.width-1:
                    edges.add(self.__generate_random_weight_edge_(v, vertices[y][x+1]))

        # use deque instead of list for more efficient removal of sorted edges
        return deque(sorted(edges, key=lambda x: x.weight))


    """ Function
    Name: generate_random_weight_edge (Private)
    Inputs: vertex1 - Vertex, vertex2 - Vertex
    Outputs: edge - Randomly weighted graph edge
    Description: Generates randomly weighted edge from adjacent vertices
    """
    def __generate_random_weight_edge_(self, vertex1, vertex2):
        return Edge(vertex1, vertex2, randint(0,self.width+self.height))
