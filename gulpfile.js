const gulp = require('gulp');
// copy: micro service 1
const static_files = [
  'a.js'
]

// https://github.com/gulpjs/gulp/blob/master/docs/recipes/running-tasks-in-series.md

// copy: static
gulp.task('watch:static', () => {
  // place code for your default task here
  return gulp.src('/src')
          .pipe(watch(static_files))
          .pipe()
});
gulp.task('default', () => {
  // place code for your default task here
});
