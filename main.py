import os
import logging
from logging.handlers import RotatingFileHandler
from flask import Flask, request, render_template, jsonify
from maze import Maze

app = Flask(__name__, static_url_path='/static')
# to enable pug support in templates instead of jinja2
app.jinja_env.add_extension('pypugjs.ext.jinja.PyPugJSExtension')


# home route, now routing to template using canvas
@app.route('/')
def welcome():
    return render_template('index.pug')


# tester function for testing maze generation in isolation without server
def main():
    height = width = 5
    environment = Maze(height, width)
    import pdb; pdb.set_trace()
    print(environment)


# api endpoint for new mazes
@app.route('/api/new_maze', methods=["GET"])
def maze():
    width = int(request.args.get("height"))
    height = int(request.args.get("width"))
    if width and height:
        environment = Maze(height, width)
        return jsonify({'maze' : environment._jsonify()})


# old maze endpoint
@app.route('/new', methods=["GET"])
def generate_maze():
    width = int(request.args.get("height"))
    height = int(request.args.get("width"))
    if width and height:
        environment = Maze(height, width)
        return render_template('maze.html',
        maze=environment.cells,
        width=environment.width,
        height=environment.height)



# server initialization tasks
def server_start():

    # setting up log file handler
    handler = RotatingFileHandler('%s/logs/application.log' % os.path.dirname(os.path.realpath(__file__)), maxBytes=10000, backupCount=1)
    handler.setLevel(logging.INFO)
    app.logger.addHandler(handler)
    
    # app config from environment variables
    port = os.getenv('PORT', '5000')

    debug = (lambda x: x in ['True', 'true', 'T', 't', 'TRUE'])(os.getenv('DEBUG', 'True'))

    # and off we go
    app.run(host='0.0.0.0', port=int(port), debug=debug)


if __name__ == "__main__":
    server_start()
