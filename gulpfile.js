const gulp = require('gulp')
const srcPath = './src'
const tempPath = './temp'
const distPath = './dist'
// copy: micro service 1

// https://github.com/gulpjs/gulp/blob/master/docs/recipes/running-tasks-in-series.md
// eslint

// const copy = require('gulp-contrib-copy')
// gulp.task('copy:web_static', () => {
//   return gulp.src('**/*', {cwd: srcPath})
//           .pipe(copy())
//           .pipe(gulp.dest('.', {cwd: tempPath}))
// })

// const fs = require('nodejs-fs-utils')
// gulp.task('clean:web_static_temp', () => {
//   fs.rmdirsSync(tempPath)
// })
const del = require('del')
gulp.task('clean:web_static_dist', () => del.sync(distPath + '/**/*'))

const webpack = require('gulp-webpack')
const webpackConfig = require('./configs/webpack.web_static.js')
gulp.task('webpack:web_static', () => {
  console.log(webpackConfig)
  return gulp.src('web_static/index.js', {cwd: srcPath})
          .pipe(webpack(webpackConfig))
          .pipe(gulp.dest(distPath))
})

// const watcher = gulp.watch('**/*', ['build:web_static'])
// watcher.on('change', () => console.log('File ' + event.path + ' was ' + event.type + ', running tasks...'))


gulp.task(
  'build:web_static',
  [
    // 'clean:web_static_temp',
    // 'copy:web_static',
    'clean:web_static_dist',
    'webpack:web_static',
    // 'clean:web_static_temp',
  ]
)
