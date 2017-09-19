var webpack = require('webpack')
var path = require('path')

const BUILD_DIR = path.resolve(__dirname, '..', 'static')
const APP_DIR = path.resolve(__dirname, '..', 'src')

var config = {
  entry: {
    app: ['babel-polyfill', APP_DIR]
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].js'
  },
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
      },
      {
        test: /\.js$/,
        include: APP_DIR,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        include: APP_DIR,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader'
      },
      {
        test: /\.css$/,
        include: '/',
        loader: 'style-loader!css-loader!postcss-loader'
      },
      {
        test: /\.pug$|\.jade$/,
        include: APP_DIR,
        loader: 'pug-loader'
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  plugins : [
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          failOnWarning: false,
          failOnError: true,
          fix: true
        }
      }
    })
  ]
}

module.exports = config
