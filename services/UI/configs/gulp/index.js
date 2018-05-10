const gulp = require('gulp')

const {startDevServer} = require('./startServer')
gulp.task('startDevServer', startDevServer)

const {watchComponents, generateRouters} = require('./watchComponentsAndGenerateRouters')
gulp.task('watchComponents', watchComponents)
gulp.task('generateRouters', generateRouters)

gulp.task('default', gulp.series(
  'generateRouters',
  'watchComponents',
  // 'startDevServer',
))
