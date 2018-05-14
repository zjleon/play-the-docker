const path = require('path')
const gulp = require('gulp')

require('dotenv')
.config({
  path: path.resolve(__dirname, '../../', '.env')
})

const {startDevServer} = require('./startServer')
gulp.task('startDevServer', startDevServer)

const {watchComponents, generateRouters} = require('./watchComponentsAndGenerateRouters')
gulp.task('watchComponents', watchComponents)
gulp.task('generateRouters', generateRouters)

gulp.task('default', gulp.series(
  'generateRouters',
  'watchComponents',
  'startDevServer',
))
