import unittest
from grid import Grid


class TestGrid(unittest.TestCase):
    def setUp(self):
        pass

    def test_small_grid(self):
        maze = Grid(2, 2)
        assert True

def test_grid():
    suite = unittest.TestLoader().loadTestsFromTestCase(TestGrid)
    unittest.TextTestRunner(verbosity=2).run(suite)

if __name__ == "__main__":
    test_grid()