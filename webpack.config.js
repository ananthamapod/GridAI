var webpack = require('webpack')
var path = require('path')
var htmlWebpackPlugin = require('html-webpack-plugin')

var BUILD_DIR = path.resolve(__dirname, 'static')
var APP_DIR = path.resolve(__dirname, 'src')

var config = {
  entry: [
    'babel-polyfill',
    APP_DIR + '/index.js'
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [
      // Javascript
      { test: /\.js?$/, loader: 'eslint', exclude: /node_modules/ }
    ],
    loaders: [
      {
        test: /\.js?/,
        include: APP_DIR,
        loader: 'babel'
      },
      {
        test: /\.scss?/,
        include: APP_DIR,
        loader: 'style!css!postcss!sass'
      },
      {
        test: /\.css?/,
        include: '/',
        loader: 'style!css!postcss'
      },
      {
        test: /\.pug|\.jade?/,
        include: APP_DIR,
        loader: 'pug-loader'
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  eslint: {
    failOnWarning: false,
    failOnError: true
  },
  plugins : [
    new htmlWebpackPlugin({
      template: APP_DIR + '/templates/index.pug',
      title: 'GridAI - Home',
      inject: 'body'
    }),
    /*
    new webpack.optimize.UglifyJsPlugin({
      beautify : false
    }),*/
    new webpack.ProvidePlugin({
       $: "jquery",
       jQuery: "jquery",
       Tether: "tether"
    })
  ]
}

module.exports = config
