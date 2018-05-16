const path = require('path')
const gulp = require('gulp')

const envPath = path.resolve(__dirname, '../../', `.env.${process.env.NODE_ENV}`)
require('dotenv')
  .config({
    path: envPath
  })

const {createFoldersIfNotExist} = require('./initFolders')
gulp.task('createFoldersIfNotExist', createFoldersIfNotExist)

const {startDevServer} = require('./startServer')
gulp.task('startDevServer', startDevServer)

const {watchComponents, generateRouters} = require('./watchComponentsAndGenerateRouters')
gulp.task('watchComponents', watchComponents)
gulp.task('generateRouters', generateRouters)

const {watchImageSources, convertImages} = require('./watchAssets')
gulp.task('watchImageSources', watchImageSources)
gulp.task('convertImages', convertImages)

gulp.task('default', gulp.series(
  'createFoldersIfNotExist',
  'generateRouters',
  'convertImages',
  'watchComponents',
  'watchImageSources',
  // 'startDevServer',
))
