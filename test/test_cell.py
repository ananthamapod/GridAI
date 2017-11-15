import unittest
from app.cell import Cell


class TestCell(unittest.TestCase):
    def setUp(self):
        self.cell = Cell(1, 1)

    def test_cell_to_string(self):
        self.assertEqual(str(self.cell), "{'neighbors': '[]'}")

    def test_cell_to_json(self):
        self.assertEqual(self.cell._json_repr(), {
            "neighbors": [],
            "filled": False
        })

def test_cell():
    suite = unittest.TestLoader().loadTestsFromTestCase(TestCell)
    unittest.TextTestRunner(verbosity=2).run(suite)

if __name__ == "__main__":
    test_cell()
