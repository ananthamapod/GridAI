var path = require('path')
// var htmlWebpackPlugin = require('html-webpack-plugin')

const APP_DIR = path.resolve(__dirname, '..', 'src')

var config = {
  plugins : [
    // new htmlWebpackPlugin({
    //   template: APP_DIR + '/templates/index.pug',
    //   title: 'GridAI - Home',
    //   inject: 'body'
    // })
  ]
}

module.exports = config
