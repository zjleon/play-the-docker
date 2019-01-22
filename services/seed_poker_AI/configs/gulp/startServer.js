const gulp = require('gulp')
const gls = require('gulp-live-server')

exports.startDevServer = function(callback) {
  let server = gls('../../index.js', undefined, Math.round(Math.random() * 500 + 35729))
  server.start()

  gulp.watch('../../**/*.js', function() {
    server.start.bind(server)()
  })
}

exports.startProductionServer = function(done) {
}
