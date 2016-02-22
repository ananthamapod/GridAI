from grid import Grid, Edge, Vertex
from random import randint
from collections import deque

""" Class
Name: Maze
Description: Subclass of Grid, maze environment
Fields:
 - width - integer width of grid
 - height - integer height of grid
 - cells - Cell objects for each cell in grid
Functions:
 - generate_maze - build maze in grid
"""
class Maze(Grid):
    """ Function
    Name: generate_maze
    Inputs: None
    Outputs: None
    Description: Generates maze based on building a spanning tree. Constructs
        temporary graph of grid, generates randomly weighted edges, applies
        Kruskal's algorithm to generate spanning tree. Applies the spanning
        tree edges to current cells in self
    """
    def generate_maze(self):
        ### vertices
        vertices = [[Vertex(x,y) for x in range(self.width)] for y in range(self.height)]
        ### edges
        edges = set()
        # builds a list of edges with random weights, where edges are not duplicated
        # Note: no edge is tied to any particular vertex
        for y in range(self.height):
            for x in range(self.width):
                v = vertices[y][x]
                if y > 0:
                    edges.add(Edge(v,vertices[y-1][x],randint(0,self.width+self.height)))
                if y < self.height-1:
                    edges.add(Edge(v,vertices[y+1][x],randint(0,self.width+self.height)))
                if x > 0:
                    edges.add(Edge(v,vertices[y][x-1],randint(0,self.width+self.height)))
                if x < self.width-1:
                    edges.add(Edge(v,vertices[y][x+1],randint(0,self.width+self.height)))

        #print 'Edge-Set: [' + reduce(lambda x,y: str(x) + ',' + str(y), edges) +']'
        # use deque instead of list for more efficient removal of sorted edges
        edges = deque(sorted(edges, key=lambda x: x.weight))
        #print map(lambda x: x.weight, edges)

        ### union sets
        vertex_sets = set()
        ### path
        path = []
        count = 1
        total = self.height*self.width

        # looks through sets of connected vertices and finds the set of a particular vertex
        # if no set contains, returns a set consisting of just that vertex
        def findSetOfOccurrence(v, sets):
            for s in sets:
                if v in s:
                    return frozenset(s)
            return frozenset([v])

        # run Kruskal's until all vertices are connected
        while count < total:
            edge = edges.popleft()
            curr_vs = list(edge.vertices)
            v_set1 = findSetOfOccurrence(curr_vs[0], vertex_sets)
            v_set2 = findSetOfOccurrence(curr_vs[1], vertex_sets)
            #print reduce(lambda x,y: str(x)+','+str(y),v_set1)
            #print reduce(lambda x,y: str(x)+','+str(y),v_set2)
            # would cause a cycle, ignore
            if v_set1 == v_set2:
                continue
            # else
            # remove the sets if they exist in the current group
            for i in (v_set1, v_set2):
                try:
                    vertex_sets.remove(frozenset(i))
                except KeyError:
                    pass
            # add back the unioned set
            vertex_sets.add(frozenset(v_set1|v_set2))
            #print "VS"
            #print "\n".join([reduce(lambda x,y: str(x)+','+str(y),s) for s in vertex_sets])
            #print "-----"
            path.append(edge)
            count += 1

        # put maze edges into grid
        print reduce(lambda x,y: str(x) + ',' + str(y), path)
        for edge in path:
            vs = list(edge.vertices)
            v1 = self.cells[vs[0].y][vs[0].x]
            v2 = self.cells[vs[1].y][vs[1].x]
            v1.neighbors.append((vs[1].y-vs[0].y, vs[1].x-vs[0].x))
            v2.neighbors.append((vs[0].y-vs[1].y, vs[0].x-vs[1].x))
