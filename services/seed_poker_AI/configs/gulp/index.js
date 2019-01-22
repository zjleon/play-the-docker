const path = require('path')
const gulp = require('gulp')
const babelConfigs = require('../babel.config')
require('@babel/register')(babelConfigs)

const envPath = path.resolve(__dirname, '../../', `.env.${process.env.NODE_ENV}`)
require('dotenv')
  .config({
    path: envPath
  })

const {createFoldersIfNotExist, clearBuildFolder} = require('./initFolders')
gulp.task('createFoldersIfNotExist', createFoldersIfNotExist)
gulp.task('clearBuildFolder', clearBuildFolder)

const {getMessageTypes} = require('./metaData')
gulp.task('getMessageTypes', getMessageTypes)

const {runTests} = require('./test')
gulp.task('runTests', runTests)

const {startDevServer, startProductionServer} = require('./startServer')
gulp.task('startDevServer', startDevServer)
// gulp.task('startProductionServer', startProductionServer)


gulp.task('default', gulp.series(
  'clearBuildFolder',
  'createFoldersIfNotExist',
  'getMessageTypes',
  'startDevServer',
))

gulp.task('production', gulp.series(
  'clearBuildFolder',
  'createFoldersIfNotExist',
  // 'buildProduction',
  // 'startProductionServer',
))


gulp.task('test', gulp.series(
  'clearBuildFolder',
  'createFoldersIfNotExist',
  'getMessageTypes',
  'runTests',
))
