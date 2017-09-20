var path = require('path')
var StyleLintPlugin = require('stylelint-webpack-plugin')
// var htmlWebpackPlugin = require('html-webpack-plugin')

const APP_DIR = path.resolve(__dirname, '..', 'src')

var config = {
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true
        }
      }
    ]
  },
  plugins : [
    // new htmlWebpackPlugin({
    //   template: APP_DIR + '/templates/index.pug',
    //   title: 'GridAI - Home',
    //   inject: 'body'
    // }),
    new StyleLintPlugin()
  ]
}

module.exports = config
