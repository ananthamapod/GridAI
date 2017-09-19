var webpack = require('webpack')
var path = require('path')
// var htmlWebpackPlugin = require('html-webpack-plugin')

const BUILD_DIR = path.resolve(__dirname, 'static')
const APP_DIR = path.resolve(__dirname, 'src')

var config = {
  entry: {
    app: [
      'babel-polyfill',
      APP_DIR
    ]
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
        query: {
          failOnWarning: false,
          failOnError: true
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
    // new htmlWebpackPlugin({
    //   template: APP_DIR + '/templates/index.pug',
    //   title: 'GridAI - Home',
    //   inject: 'body'
    // }),
    /*
    new webpack.optimize.UglifyJsPlugin({
      beautify : false
    }),*/
    new webpack.ProvidePlugin({
       $: "jquery",
       jQuery: "jquery",
       Popper: ["popper.js", "default"]
    })
  ]
}

// For now, these are the same
var devConfig = config
var prodConfig = config

module.exports = (env) => {
  console.log(`Webpack environment: ${env}`)
  return env === "production"? prodConfig : devConfig
}
