import unittest
from cell import Cell


class TestCell(unittest.TestCase):
    def setUp(self):
        pass

    def test_single_cell(self):
        maze = Cell(1, 1)
        assert True

def test_cell():
    suite = unittest.TestLoader().loadTestsFromTestCase(TestCell)
    unittest.TextTestRunner(verbosity=2).run(suite)

if __name__ == "__main__":
    test_cell()