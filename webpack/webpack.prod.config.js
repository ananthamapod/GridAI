var webpack = require('webpack')

var config = {
  plugins : [
    new webpack.optimize.UglifyJsPlugin({
      beautify : false
    }),
  ]
}

module.exports = config
