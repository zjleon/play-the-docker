const path = require('path')
const enviromentPrefix = 'prod'
const projectName = 'web_static'
const srcPath = path.resolve('./src/' + projectName)

module.exports = {
  entry: srcPath + '/index.js',
  output: {
    path: './dist/' + projectName,
    publicPath: "/assets/",
    filename: 'app.js'
  },
  resolve: {
    modulesDirectories: [
      srcPath + '/node_modules'
    ]
  },
  module: {
    loaders: [{
      resolveLoader: {
        root: [
          path.resolve('./node_modules')
        ]
      },
      test: /\.js/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: [
          'es2015',
          'react',
        ]
      }
    }]
  },
}
