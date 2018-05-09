const gulp = require('gulp')

const {startDevServer} = require('./startServer')
gulp.task('startDevServer', startDevServer)

gulp.task('default', gulp.series(
  'startDevServer',
))
