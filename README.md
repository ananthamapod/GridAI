# GridWorld
>Full featured AI grid environment

[![Build Status](https://travis-ci.org/ananthamapod/GridAI.svg?branch=master)](https://travis-ci.org/ananthamapod/GridAI)

This is a playground for exploring AIs and search algorithms in grid environments. It also has a web interface built with Flask
![gridaiscreenshot](https://user-images.githubusercontent.com/5254722/31338745-80177be2-acce-11e7-9058-cc9f7a6b1c7c.png)

---

## Setup
Install the relevant dependencies (Flask and related). I recommend installing these in a virtual environment. For more information on virtual environments in Python, see [Virtualenv](http://docs.python-guide.org/en/latest/dev/virtualenvs/)

    pip install -r requirements.txt

## Running the Server
The server can be run from within the current directory using

    python main.py

If working with Virtualenv, first activate the virtual environment by using

    source <name-of-the-environment-folder>/bin/activate


## Implementation
The maze is generated using a variation of Kruskal's Algorithm for generating minimum weight spanning trees of a graph. The search algorithms are common graph search algorithms, outlined below:

* Depth first search - a search method that prioritizes fully exploring a given branch before trying a different branch. ?>Implemented here using a stack to store the fringe (and by extension the parental heirarchy of a given branch)

* Breadth first search - a search method that extends radially outward from a starting point and successively explores each level fully before searching along the next level, where levels are organized by distance from the starting node (could be thought of as a kind of cost function, for those who know what's coming next :wink:)
>Implemented here using a queue to store the fringe

* Best first search - a search method that uses a heuristic to evaulate the worth of each cell at the edge of the fringe and selects the best cell to explore next
>Implemented using Euclidean distance from goal as heuristic and using a sorted list (though ideal would be a heap)

* A\* search - an enhancement on best first search that uses a combination of heuristic and cost function to decide the best cell to explore next
>Implemented using Euclidean distance from goal as heuristic and level (as in breadth first search) as cost function, using a sorted list for the fringe (as with best first search, ideal would be min heap)
