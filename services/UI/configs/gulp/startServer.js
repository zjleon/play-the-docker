const WebpackDevServer = require("webpack-dev-server")
const webpack = require("webpack")
const path = require('path')
const fs = require('fs')
const webpackConfig = require('../webpack.dev')
const {PORT} = require('../constants')

const compiler = webpack(webpackConfig)
let server

exports.startDevServer = function(callback) {
  if (server) {
    server.close()
    server = null
  }
  server = new WebpackDevServer(compiler, webpackConfig.devServer)
  server.listen(PORT, "0.0.0.0", () => {
    console.log('dev server started up at port' + PORT)
    callback()
  })
}
