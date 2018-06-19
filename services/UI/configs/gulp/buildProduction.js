const webpack = require("webpack")
const webpackConfig = require('../webpack.prod')

exports.buildProduction = function(done) {
  webpack(webpackConfig, (error, stats) => {
    if (error) {
      done(error)
    }
    if (stats.hasErrors()) {
      done(stats.toJson().errors)
    }
    done()
  })
}
