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
    // root: [
    //   srcPath
    // ]
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
      // loaders: ['babel-loader'],
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
  // plugins: [
  //   'transform-react-jsx-source',
  //   'transform-react-display-name',
  //   'transform-react-jsx',
  // ]
}
