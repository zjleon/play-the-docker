const path = require('path')
const gulp = require('gulp')

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
gulp.task('startProductionServer', startProductionServer)

const {watchComponents, generateRouters} = require('./watchComponentsAndGenerateRouters')
gulp.task('watchComponents', watchComponents)
gulp.task('generateRouters', generateRouters)

const {watchActions, generateActions} = require('./watchActions')
gulp.task('watchActions', watchActions)
gulp.task('generateActions', generateActions)

const {watchImageSources, convertImages} = require('./watchAssets')
gulp.task('watchImageSources', watchImageSources)
gulp.task('convertImages', convertImages)

const {buildProduction} = require('./buildProduction')
gulp.task('buildProduction', buildProduction)

gulp.task('default', gulp.series(
  'createFoldersIfNotExist',
  'generateActions',
  'generateRouters',
  'convertImages',
  'watchComponents',
  'watchActions',
  'watchImageSources',
  'startDevServer',
))

gulp.task('production', gulp.series(
  'clearBuildFolder',
  'createFoldersIfNotExist',
  'generateRouters',
  'convertImages',
  'buildProduction',
  'startProductionServer',
))
