const webpack = require("webpack")
const path = require('path')
const fs = require('fs')
const webpackConfig = require('../webpack.prod')
const {PORT} = require('../constants')

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
