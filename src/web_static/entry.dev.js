const WebpackDevServer = require("webpack-dev-server")
const webpack = require("webpack")
// const config = require('./configs/webpack.prod.web_static')
const webpackConfig = require('./configs/webpack.dev.web_static')
const gulp = require('gulp')

// const errorTrace = (err, stats) => {
//   if (err) {
//     console.error(err.stack || err)
//     if (err.details) {
//       console.error(err.details)
//     }
//     return
//   }
//
//   const info = stats.toJson()
//
//   if (stats.hasErrors()) {
//     console.error(info.errors)
//   }
//
//   if (stats.hasWarnings()) {
//     console.warn(info.warnings)
//   }
// }

let compiler = webpack(webpackConfig)

// Done processing
const server = new WebpackDevServer(compiler)
server.listen(8080, "0.0.0.0", () => {
  console.log('dev server started up')
})
// server.close();
