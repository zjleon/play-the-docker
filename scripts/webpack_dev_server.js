const WebpackDevServer = require("webpack-dev-server")
const webpack = require("webpack")
const config = require('../configs/webpack.web_static')
const devServerConfig = require('../configs/webpack.dev.web_static')

const compiler = webpack(config)
const server = new WebpackDevServer(compiler, devServerConfig)
server.listen(8080, "localhost", () => {
  console.log('dev server started up')
})
// server.close();
