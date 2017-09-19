var webpack = require('webpack')
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

var config = {
  plugins : [
    new webpack.optimize.UglifyJsPlugin({
      beautify : false
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: {removeAll: true }
      },
      canPrint: true
    })
  ]
}

module.exports = config
