require('dotenv').config()
const WebpackDevServer = require("webpack-dev-server")
const webpack = require("webpack")
const webpackConfig = require('./configs/webpack.dev')
const gulp = require('gulp')
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')
const moment = require('moment')
const deepequal = require('deepequal')
const watch = require('gulp-watch')

let compiler = webpack(webpackConfig)
let server

gulp.task('startWebpackServer', (callback) => {
  if (server) {
    server.close()
  }
  // Done processing
  server = new WebpackDevServer(compiler, webpackConfig.devServer)
  server.listen(process.env.PORT, "0.0.0.0", () => {
    console.log('dev server started up at port' + process.env.PORT)
    callback()
  })
})

// image auto resize
const imageFolderDist = './dist/images'
const imageFolderSrc = './images'
try {
  fs.mkdirSync(imageFolderDist)
} catch (e) {e}
gulp.task('watchImages', () => {
  return watch('./images/*.*', {events: ['add', 'change']}, function(event) {
    sharpImage(path.relative(path.resolve('./'), event.path))
  })
})
gulp.task('convertImages', (callback) => {
  // convert all images at the first-time gulp runs
  fs.readdir(imageFolderSrc, (error, files) => {
    let promises = files.map((file) => {
      return sharpImage(path.resolve(imageFolderSrc, file))
    })
    Promise.all(promises)
    .then(() => {
      callback()
    })
  })
})
const targetDeviceWidth = JSON.parse(process.env.IMAGE_RESIZE_CONFIG)
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
  imageInfo = JSON.parse(fs.readFileSync('./common/ImageInfo.json', 'utf8'))
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
      extention: imageExtention,
      lastModifed: lastModifed,
      path: path.resolve(webpackConfig.output.publicPath, './images/' + imageFullName + imageExtention),
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
        width: targetDeviceWidth[i],
        height: parseInt(targetDeviceWidth[i] * meta.aspect, 10),
        aspect: meta.aspect,
        extention: imageExtention,
        path: path.resolve(
          webpackConfig.output.publicPath,
          './images/' + imageFullName + '@' + targetDeviceWidth[i] + imageExtention
        ),
      }
    }
    targets[imageFullName] = meta

    let promises = []
    for (let key in targets) {
      if (targets.hasOwnProperty(key)) {
        promises.push(
          imagePromise.clone()
          .resize(targets[key].width, targets[key].height)
          .toFile(imageFolderDist + '/' + key + targets[key].extention)
        )
      }
    }

    promises.push(new Promise(function(resolve, reject) {
      Object.assign(imageInfo, targets)
      fs.writeFile('./common/ImageInfo.json', JSON.stringify(imageInfo, null, 2), function(err) {
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

gulp.task('default', [
  'convertImages',
  'watchImages',
  'startWebpackServer',
])
