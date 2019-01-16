const path = require('path')
const gulp = require('gulp')
require('@babel/register')

const envPath = path.resolve(__dirname, '../../', `.env.${process.env.NODE_ENV}`)
require('dotenv')
  .config({
    path: envPath
  })

const {createFoldersIfNotExist, clearBuildFolder} = require('./initFolders')
gulp.task('createFoldersIfNotExist', createFoldersIfNotExist)
gulp.task('clearBuildFolder', clearBuildFolder)

const {startDevServer, startProductionServer} = require('./startServer')
gulp.task('startDevServer', startDevServer)
// gulp.task('startProductionServer', startProductionServer)


gulp.task('default', gulp.series(
  'clearBuildFolder',
  'createFoldersIfNotExist',
  'startDevServer',
))

gulp.task('production', gulp.series(
  'clearBuildFolder',
  'createFoldersIfNotExist',
  // 'buildProduction',
  // 'startProductionServer',
))
