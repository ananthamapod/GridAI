import unittest
from app.grid import Grid


class TestGrid(unittest.TestCase):
    def setUp(self):
        self.grid = Grid(1, 1)

    def test_grid_to_string(self):
        self.assertEqual(str(self.grid), """[["{\'neighbors\': \'[]\'}"]]""")

    def test_grid_to_json(self):
        self.assertEqual(self.grid._json_repr(), {
            "width": 1,
            "height": 1,
            "cells": [
                [
                    {
                        "neighbors": [],
                        "filled": False
                    }
                ]
            ]
        })

def test_grid():
    suite = unittest.TestLoader().loadTestsFromTestCase(TestGrid)
    unittest.TextTestRunner(verbosity=2).run(suite)

if __name__ == "__main__":
    test_grid()
