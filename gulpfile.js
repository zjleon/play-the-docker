const gulp = require('gulp')
const srcPath = './src'
const tempPath = './temp'
const distPath = './dist'
// copy: micro service 1

// https://github.com/gulpjs/gulp/blob/master/docs/recipes/running-tasks-in-series.md
// eslint

const copy = require('gulp-contrib-copy')
gulp.task('copy:web_static', () => {
  return gulp.src('**/*', {cwd: srcPath})
          .pipe(copy())
          .pipe(gulp.dest('.', {cwd: tempPath}))
})

const del = require('del')
gulp.task('clean:web_static_temp', () => del([ tempPath + '/**/*' ]))
gulp.task('clean:web_static_dist', () => del([ distPath + '/**/*' ]))

const webpackConfig = require('./configs/webpack.web_static')
gulp.task('webpack:web_static', () => {
  return gulp.src('./src/entry/web_static.js', {cwd: srcPath})
          .pipe(webpackConfig)
          .pipe(gulp.dest('./dist/'))
})

gulp.task(
  'build:web_static',
  [
    'clean:web_static_temp',
    'copy:web_static',
    'clean:web_static_dist',
    'webpack:web_static',
    // 'clean:web_static_temp',
  ]
)
