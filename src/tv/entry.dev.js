const WebpackDevServer = require("webpack-dev-server")
const webpack = require("webpack")
const webpackConfig = require('./configs/webpack.dev')
const gulp = require('gulp')

let compiler = webpack(webpackConfig)

// Done processing
const server = new WebpackDevServer(compiler)
server.listen(process.env.PORT, "0.0.0.0", () => {
  console.log('dev server started up at port' + process.env.PORT)
})
console.log(process.env)
// server.close();
