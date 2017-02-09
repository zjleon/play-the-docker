const WebpackDevServer = require("webpack-dev-server")
const webpack = require("webpack")
const config = require('./configs/webpack.prod.web_static')
const devServerConfig = require('./configs/webpack.dev.web_static')

const compiler = webpack(config, (err, stats) => {
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
  // Done processing
  // const server = new WebpackDevServer(compiler, devServerConfig)
  // server.listen(8080, "localhost", () => {
  //   console.log('dev server started up')
  // })
})
// server.close();
