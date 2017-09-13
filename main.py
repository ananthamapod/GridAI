import os
import logging
from logging.handlers import RotatingFileHandler
from datetime import datetime
from flask import Flask, request, render_template, jsonify
from flask_webpack import Webpack
from maze import Maze


webpack = Webpack()

app = Flask(__name__, static_url_path='/static')
# to enable pug support in templates instead of jinja2
webpack.init_app(app)
app.jinja_env.add_extension('pypugjs.ext.jinja.PyPugJSExtension')


# home route, now routing to template using canvas
@app.route('/')
def welcome():
    return render_template('index.pug')


# api endpoint for new mazes
@app.route('/api/new_maze', methods=["GET"])
def maze():
    width = None
    height = None
    try:
        width = int(request.args.get("height"))
        height = int(request.args.get("width"))
    except Exception as e:
        app.logger.error('New maze attempted with invalid dimensions %s and %d at %s', width, height, str(datetime.today()))
    else:
        if width and height:
            environment = Maze(height, width)
            return jsonify({'maze': environment._json_repr()})



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
