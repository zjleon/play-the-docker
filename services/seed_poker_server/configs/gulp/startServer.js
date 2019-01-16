const path = require('path')
const fs = require('fs')
const {envs} = require('../constants')
const gulp = require('gulp')
const gls = require('gulp-live-server')

exports.startDevServer = function(callback) {
  let server = gls('../../index.js')
  server.start()

  gulp.watch('../../**/*.js', function() {
    server.start.bind(server)()
  })
}

exports.startProductionServer = function(done) {
}
