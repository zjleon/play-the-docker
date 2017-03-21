const devConfig = require('./webpack.dev.web_static')
let prodConfig = devConfig

prodConfig.watch = false

prodConfig.devServer = {}

prodConfig.entry = {
  main: devConfig.entry.main.splice(3),
  vendor: devConfig.entry.vendor.splice(3),
}

module.exports = prodConfig
