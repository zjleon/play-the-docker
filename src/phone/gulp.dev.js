const WebpackDevServer = require("webpack-dev-server")
const webpack = require("webpack")
const webpackConfig = require('./configs/webpack.dev')
const gulp = require('gulp')
require('dotenv').config()
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')
const moment = require('moment')
const deepequal = require('deepequal')

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

const imageFolderDist = './dist/images'
const imageFolderSrc = './images'
gulp.task('watchImages', () => {
  return gulp.watch('./images/*.*')
  .on('change', (event) => {
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
const sharpImage = (file) => {
  const filePath = path.parse(file)
  if (!filePath.name || !filePath.ext) {
    return Promise.resolve()
  }
  return new Promise((resolve) => {
    const distPath = path.resolve(imageFolderDist, filePath.base)
    // check if this image exist in dist path
    // TODO: handle the image removed event
    fs.stat(distPath, (error, stats) => {
      if (error && error.code === 'ENOENT') {
        console.log('new image detected')
        const image = sharp(file)
        // TODO: to different screen size images, and output the url of those images
        imageMetaToJson(image, filePath.name)
        resolve(image.clone().toFile(distPath))
        return
      }
      const originFileStat = fs.statSync(file)
      if (moment(stats.ctime) < moment(originFileStat.mtime)) {
        // dist image is older than original image
        console.log('image changes detected')
        const image = sharp(file)
        imageMetaToJson(image, filePath.name)
        resolve(image.clone().toFile(distPath))
        return
      }
      resolve()
      return
    })
  })
}
let imageInfo = require('./common/ImageInfo.json')
const imageMetaToJson = (imagePromise, imageName) => {
  imagePromise.metadata()
  .then((metadata) => {
    const meta = {
      width: metadata.width,
      height: metadata.height,
      aspect: metadata.width / metadata.height,
    }
    if (deepequal(meta, imageInfo[imageName])) {
      return
    }
    imageInfo[imageName] = meta
    fs.writeFile('./common/ImageInfo.json', JSON.stringify(imageInfo, null, 2), function(err) {
      if (err) {
        console.log(err)
      } else {
        console.log(`saved image: ${imageName}; metadata: ${JSON.stringify(meta)}`)
      }
    })
  })
}


gulp.task('default', [
  'convertImages',
  'watchImages',
  // 'startWebpackServer'
])
