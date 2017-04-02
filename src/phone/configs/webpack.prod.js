const devConfig = require('./webpack.dev')
let prodConfig = devConfig

prodConfig.watch = false
prodConfig.watchOptions = {}

prodConfig.devServer = {}

prodConfig.devtool = 'source-map'

prodConfig.entry = {
  main: devConfig.entry.main.splice(3),
  vendor: devConfig.entry.vendor.splice(3),
}


module.exports = prodConfig
