const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const ManifestRevisionPlugin = require('manifest-revision-webpack-plugin')

const BUILD_DIR = path.resolve(__dirname, '..', 'static')
const APP_DIR = path.resolve(__dirname, '..', 'src')

const config = {
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
    // new ManifestRevisionPlugin(path.join('static', 'manifest.json'), {
    //   rootAssetPath: './static',
    //   ignorePaths: ['/css', '/js'],
    // }),
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
