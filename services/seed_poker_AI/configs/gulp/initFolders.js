const fs = require('fs')
const path = require('path')

const projectRootPath = path.resolve('../../')
const outputPath = path.resolve(projectRootPath, './dist')

function createFoldersIfNotExist(callback) {
  // create destination directory
  fs.mkdirSync(outputPath)
  callback()
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
