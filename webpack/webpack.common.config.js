var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

const BUILD_DIR = path.resolve(__dirname, '..', 'static')
const APP_DIR = path.resolve(__dirname, '..', 'src')

var config = {
  entry: {
    vendor: ['jquery', 'bootstrap'],
    app: ['babel-polyfill', APP_DIR]
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: APP_DIR,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        include: APP_DIR,
        loader: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => ([
                  require('autoprefixer')()
                ])
              }
            },
            'sass-loader'],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.css$/,
        include: '/',
        loader: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => ([
                  require('autoprefixer')()
                ])
              }
            }
          ],
          fallback: 'style-loader'
        })
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
    new ExtractTextPlugin("[name].css"),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: ({resource}) => (
        resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/\.js$/)
      )
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          failOnWarning: false,
          failOnError: true,
          fix: true
        }
      }
    }),
    new webpack.ProvidePlugin({
       $: "jquery",
       jQuery: "jquery",
       Popper: "popper.js"
    })
  ]
}

module.exports = config
