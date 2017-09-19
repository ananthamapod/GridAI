var merge = require('webpack-merge')

var commonConfig = require('./webpack/webpack.common.config')

module.exports = (env) => {
  console.log(`Webpack environment: ${env}`)
  if (env === "production") {
    return merge([commonConfig, require('./webpack/webpack.prod.config')])
  }
  return merge([commonConfig, require('./webpack/webpack.dev.config')])
}
