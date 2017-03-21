const WebpackDevServer = require("webpack-dev-server")
const webpack = require("webpack")
// const config = require('./configs/webpack.prod.web_static')
const webpackConfig = require('./configs/webpack.dev.web_static')
const gulp = require('gulp')
const express = require("express")
const webpackDevMiddleware = require("webpack-dev-middleware")

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
let compiler = webpack(webpackConfig)

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  index: "index.html"
}))
app.use(require("webpack-hot-middleware")(compiler))

app.listen(process.env.PORT, function() {
  console.log(111)
})

app.get('*', function(req, res, next) {
  req.url = 'index.html'
  next('route')
})
