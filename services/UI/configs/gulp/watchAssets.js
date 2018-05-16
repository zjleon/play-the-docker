require('dotenv').config()

const watch = require('gulp-watch')
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')
const moment = require('moment')
const deepequal = require('deepequal')

const {IMAGE_RESIZE_CONFIG} = require('../constants')
const webpackSettings = process.env.NODE_ENV === 'development' ? require('../webpack.dev') : require('../webpack.prod')
const imageFolderDist = path.resolve(webpackSettings.output.path, './images')
const projectRootPath = path.resolve('../../')
const imageInfoFilePath = path.resolve(projectRootPath, './modules/Common/ImageContainer/imageInfo.json')
const imageSourcePath = path.resolve(projectRootPath, './assets/images')

// image auto resize
function watchImageSources(done) {
  watch('./images/*.*', function(event) {
    console.log(event.path)
    if (event.contents) {
      // sharpImage(path.relative(path.resolve('./'), event.path))
      sharpImage(event.contents)
    } else {
      removeImageInfo(path.relative(path.resolve('./'), event.path))
    }
  })
  done()
}
function convertImages(done) {
  // convert all images at the first-time gulp runs
  fs.readdir(imageSourcePath, (error, files) => {
    let promises = files.map((file) => {
      console.log(222, file)
      return sharpImage(path.resolve(imageSourcePath, file))
    })
    Promise.all(promises)
      .then(() => {
        done()
      })
  })
}

const targetDeviceWidth = IMAGE_RESIZE_CONFIG
const sharpImage = (file) => {
  const filePath = path.parse(file)
  if (!filePath.name || !filePath.ext) {
    return Promise.resolve()
  }
  const originFileStat = fs.statSync(file)
  return toTargetResolution(sharp(file), filePath.name, filePath.ext, originFileStat.ctime)
}
let imageInfo
try {
  imageInfo = JSON.parse(fs.readFileSync(imageInfoFilePath, 'utf8'))
} catch (e) {
  imageInfo = {}
}
const toTargetResolution = (imagePromise, imageName, imageExtention, lastModifed) => {
  return imagePromise.metadata()
    .then((metadata) => {
      const imageFullName = imageName + imageExtention.replace('.', '_')
      const meta = {
        width: metadata.width,
        height: metadata.height,
        aspect: metadata.height / metadata.width,
        // extention: imageExtention,
        lastModifed: lastModifed,
        path: path.resolve(webpackSettings.output.publicPath, './images/' + imageFullName + imageExtention),
        siblings: [],
      }
      if (
        imageInfo[imageFullName] &&
      moment(imageInfo[imageFullName].lastModifed).isSame(meta.lastModifed)
      ) {
        return Promise.resolve()
      }
      let targets = {}
      for (let i = 0; i < targetDeviceWidth.length; i++) {
        targets[imageFullName + '@' + targetDeviceWidth[i]] = {
        // width: targetDeviceWidth[i],
        // height: parseInt(targetDeviceWidth[i] * meta.aspect, 10),
          aspect: meta.aspect,
          // extention: imageExtention,
          path: path.resolve(
            webpackSettings.output.publicPath,
            './images/' + imageFullName + '@' + targetDeviceWidth[i] + imageExtention
          ),
        }
        meta.siblings.push(imageFullName + '@' + targetDeviceWidth[i])
      }
      targets[imageFullName] = meta

      let promises = []
      for (let key in targets) {
        if (targets.hasOwnProperty(key)) {
          promises.push(
            imagePromise.clone()
              .resize(targets[key].width, targets[key].height)
              .toFile(imageFolderDist + '/' + key + imageExtention)
          )
        }
      }

      promises.push(new Promise(function(resolve, reject) {
        Object.assign(imageInfo, targets)
        fs.writeFile(imageInfoFilePath, JSON.stringify(imageInfo, null, 2), function(err) {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
      }))
      return Promise.all(promises).then(function() {
        console.log(`saved image: ${imageFullName}`)
      })
    })
}
const removeImageInfo = (file) => {
  const filePath = path.parse(file)
  if (!filePath.name || !filePath.ext) {
    return Promise.resolve()
  }
  const imageFullName = filePath.name + filePath.ext.replace('.', '_')

  const targets = imageInfo[imageFullName].siblings
  for (let i = 0; i < targets.length; i++) {
    delete imageInfo[targets[i]]
  }
  delete imageInfo[imageFullName]
  let writePromise = new Promise((resolve, reject) => {
    fs.writeFile(imageInfoFilePath, JSON.stringify(imageInfo, null, 2), function(err) {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
  return writePromise
}

module.exports = {
  watchImageSources,
  convertImages,
}
