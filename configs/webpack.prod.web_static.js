const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const enviromentPrefix = 'prod'
const projectName = 'web_static'
const srcPath = path.resolve('./src/' + projectName)
const distPath = path.resolve('./dist/' + projectName)

module.exports = {
  entry: srcPath + '/index.js',
  output: {
    path: distPath,
    publicPath: "/assets/",
    filename: 'app-[hash].js'
  },
  resolve: {
    modulesDirectories: [
      srcPath + '/node_modules'
    ]
  },
  module: {
    loaders: [
      {
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
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: srcPath + '/index.html',
      filename: distPath + '/index.html',
    })
  ]
}
