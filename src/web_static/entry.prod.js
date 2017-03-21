// const WebpackDevServer = require("webpack-dev-server")
// const webpack = require("webpack")
// const webpackConfig = require('./configs/webpack.dev.web_static')
// const gulp = require('gulp')
const express = require("express")
// const webpackDevMiddleware = require("webpack-dev-middleware")

const errorTrace = (err, stats) => {
  if (err) {
    console.error(err.stack || err)
    if (err.details) {
      console.error(err.details)
    }
    return
  }

  const info = stats.toJson()

  if (stats.hasErrors()) {
    console.error(info.errors)
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings)
  }
}

let app = express()
app.use(express.static('dist'))

app.listen(process.env.PORT, '0.0.0.0', function() {
  console.log('express started')
})

app.get('*', function(req, res, next) {
  req.url = 'index.html'
  next('route')
})
