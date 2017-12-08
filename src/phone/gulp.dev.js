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

const imageFolderDist = path.resolve(webpackConfig.output.path, './images')
const imageInfoFilePath = path.resolve(webpackConfig.output.path, './imageInfo.json')
const imageFolderSrc = './images'
let compiler = webpack(webpackConfig)
let server

gulp.task('initProject', (callback) => {
  // create distination directory
  try {
    fs.mkdirSync(imageFolderDist)
  } catch (e) {
    console.error(e)
    fs.mkdirSync(webpackConfig.output.path)
    fs.mkdirSync(imageFolderDist)
  }
  // copy env file
  fs.copyFileSync('.env.development', '.env')
  callback()
})

// image auto resize

gulp.task('watchImages', ['initProject'], () => {
  return watch('./images/*.*', function(event) {
    console.log(event.path)
    if (event.contents) {
      sharpImage(path.relative(path.resolve('./'), event.path))
    } else {
      removeImageInfo(path.relative(path.resolve('./'), event.path))
    }
  })
})
gulp.task('convertImages', ['initProject'], (callback) => {
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
      path: path.resolve(webpackConfig.output.publicPath, './images/' + imageFullName + imageExtention),
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
          webpackConfig.output.publicPath,
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

gulp.task('startWebpackServer', ['initProject', 'convertImages'], (callback) => {
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

gulp.task('default', [
  'initProject',
  'convertImages',
  'watchImages',
  'startWebpackServer',
])
