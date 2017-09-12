import unittest
from maze import Maze


class TestMaze(unittest.TestCase):
    def setUp(self):
        pass

    def test_small_maze(self):
        maze = Maze(2, 2)
        assert True

def test_maze():
    suite = unittest.TestLoader().loadTestsFromTestCase(TestMaze)
    unittest.TextTestRunner(verbosity=2).run(suite)

if __name__ == "__main__":
    test_maze()