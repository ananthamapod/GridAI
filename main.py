import os
from maze import Maze
from flask import Flask, request, render_template, jsonify

app = Flask(__name__, static_url_path='/static')
# to enable pug support in templates instead of jinja2
app.jinja_env.add_extension('pypugjs.ext.jinja.PyPugJSExtension')
appContext = app.app_context()


# home route, now routing to template using canvas
@app.route('/')
def welcome():
    return render_template('index.pug')


# tester function for testing maze generation in isolation without server
def main():
    height = width = 5
    environment = Maze(height, width)
    environment.generate_maze()
    import pdb; pdb.set_trace()
    print(environment)


# api endpoint for new mazes
@app.route('/api/new_maze', methods=["GET"])
def maze():
    width = int(request.args.get("height"))
    height = int(request.args.get("width"))
    if width and height:
        environment = Maze(height, width)
        environment.generate_maze()
        return jsonify({'maze' : environment._jsonify()})


# old maze endpoint
@app.route('/new', methods=["GET"])
def generate_maze():
    width = int(request.args.get("height"))
    height = int(request.args.get("width"))
    if width and height:
        environment = Maze(height, width)
        environment.generate_maze()
        return render_template('maze.html',
        maze=environment.cells,
        width=environment.width,
        height=environment.height)



port = os.getenv('PORT', '5000')
if __name__ == "__main__":
	app.run(host='0.0.0.0', port=int(port), debug=True)
