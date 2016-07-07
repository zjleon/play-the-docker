const gulp = require('gulp');
const webpackConfig = require('./configs/web.static.js')
// copy: micro service 1

// https://github.com/gulpjs/gulp/blob/master/docs/recipes/running-tasks-in-series.md
// eslint

// copy: static
gulp.task('watch:static', () => {
  // place code for your default task here
  return gulp.src('src')
          .pipe(watch(static_files))
})
gulp.task('webpack:static', () => {
  return gulp.src('./entry/web.static.js')
          .pipe(webpackConfig)
          .pipe(gulp.dest('dist/'))
})
gulp.task('default', () => {
  // place code for your default task here
})
