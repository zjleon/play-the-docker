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

const {startDevServer, startProductionServer} = require('./startServer')
gulp.task('startDevServer', startDevServer)
gulp.task('startProductionServer', startProductionServer)

const {watchComponents, generateRouters} = require('./watchComponentsAndGenerateRouters')
gulp.task('watchComponents', watchComponents)
gulp.task('generateRouters', generateRouters)

const {watchRedux, generateReduxFiles} = require('./watchRedux')
gulp.task('watchRedux', watchRedux)
gulp.task('generateReduxFiles', generateReduxFiles)

const {watchImageSources, convertImages} = require('./watchAssets')
gulp.task('watchImageSources', watchImageSources)
gulp.task('convertImages', convertImages)

const {buildProduction} = require('./buildProduction')
gulp.task('buildProduction', buildProduction)

gulp.task('default', gulp.series(
  'clearBuildFolder',
  'createFoldersIfNotExist',
  'getMessageTypes',
  'generateReduxFiles',
  'generateRouters',
  'convertImages',
  'watchComponents',
  'watchRedux',
  'watchImageSources',
  'startDevServer',
))

gulp.task('production', gulp.series(
  'clearBuildFolder',
  'createFoldersIfNotExist',
  'getMessageTypes',
  'generateRouters',
  'convertImages',
  'buildProduction',
  'startProductionServer',
))
