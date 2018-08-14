const fs = require('fs')
const path = require('path')

const projectRootPath = path.resolve('../../')
const webpackSettings = process.env.NODE_ENV === 'development' ? require('../webpack.dev') : require('../webpack.prod')
const outputPath = webpackSettings.output.path
const imageFolderDist = path.resolve(outputPath, './images')
const imageSourcePath = path.resolve(projectRootPath, './assets/images')
const configPath = path.resolve(projectRootPath, './configs/gulpGenerated')

function createFoldersIfNotExist(callback) {
  // create destination directory
  fs.mkdirSync(configPath)
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

function clearBuildFolder(callback) {
  function rmDir(dirPath) {
    let files
    try { files = fs.readdirSync(dirPath) } catch (e) { return }
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        let filePath = dirPath + '/' + files[i]
        if (fs.statSync(filePath).isFile()) {fs.unlinkSync(filePath)} else {rmDir(filePath)}
      }
    }
    fs.rmdirSync(dirPath)
  }
  rmDir(path.resolve(projectRootPath, outputPath))
  callback()
}

module.exports = {
  createFoldersIfNotExist,
  clearBuildFolder
}
