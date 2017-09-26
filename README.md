# GridWorld
>Full featured AI grid environment

[![Build Status](https://travis-ci.org/ananthamapod/GridAI.svg?branch=master)](https://travis-ci.org/ananthamapod/GridAI)

This is a playground for practice with building AIs in grid environments. It also has a web interface built with Flask
![gridaiscreenshot](https://user-images.githubusercontent.com/5254722/30815660-cc777958-a1e1-11e7-82e2-a1b92478289f.png)

---

## Setup
Install the relevant dependencies (Flask). Recommended to installing these in a virtual environment. For more information on virtual environments in Python, see [Virtualenv](http://docs.python-guide.org/en/latest/dev/virtualenvs/)

    pip install -r requirements.txt

## Running the Server
The server can be run from within the current directory using

    python main.py

If working with Virtualenv, first activate the virtual environment by using

    source <name-of-the-environment-folder>/bin/activate


## Implementation
The maze is generated using a variation of Kruskal's Algorithm for generating minimum weight spanning trees of a graph.
