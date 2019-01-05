const path = require('path')
const fs = require('fs')
const {envs} = require('../constants')

exports.startDevServer = function(callback) {
  const webpack = require("webpack")
  const WebpackDevServer = require("webpack-dev-server")
  const webpackConfig = require('../webpack.dev')

  const compiler = webpack(webpackConfig)
  let server

  if (server) {
    server.close()
    server = null
  }
  server = new WebpackDevServer(compiler, webpackConfig.devServer)
  server.listen(envs.PORT, "0.0.0.0", () => {
    console.log('dev server started up at port' + envs.PORT)
    callback()
  })
}

exports.startProductionServer = function(done) {
  const express = require("express")
  const webpackConfig = require("../webpack.prod")

  let app = express()
  // XXX: the pre gzip has conflict with dynamic router
  // app.get('*.js', function(req, res, next) {
  //   req.url = req.url + '.gz'
  //   res.set('Content-Encoding', 'gzip')
  //   next()
  // })
  app.use(express.static(webpackConfig.output.path))

  app.get('*', function(req, res, next) {
    res.sendFile(webpackConfig.output.path + '/index.html')
  })

  app.listen(envs.PORT, '0.0.0.0', function() {
    console.log('express started in at port' + envs.PORT)
  })
}
