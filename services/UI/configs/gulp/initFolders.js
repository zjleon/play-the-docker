const fs = require('fs')
const path = require('path')

const projectRootPath = path.resolve('../../')
const webpackSettings = process.env.NODE_ENV === 'development' ? require('../webpack.dev') : require('../webpack.prod')
const outputPath = webpackSettings.output.path
const imageFolderDist = path.resolve(outputPath, './images')
const imageSourcePath = path.resolve(projectRootPath, './assets/images')

function createFoldersIfNotExist(callback) {
  // create distination directory
  try {
    fs.mkdirSync(imageFolderDist)
  } catch (e) {
    if (e.code === 'ENOENT') {
      fs.mkdirSync(outputPath)
      fs.mkdirSync(imageFolderDist)
    }
  } finally {
    callback()
  }
}

module.exports = {createFoldersIfNotExist}
