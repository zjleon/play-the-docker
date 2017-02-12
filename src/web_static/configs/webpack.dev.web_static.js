const webpack = require("webpack")
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// const NpmInstallPlugin = require('npm-install-webpack-plugin')
const enviromentPrefix = 'prod'
const projectName = 'web_static'
const srcPath = path.resolve('.')
const distPath = path.resolve('./dist')
const fs = require('fs')
const projectConfigs = JSON.parse(fs.readFileSync('./package.json', 'utf8'))

module.exports = {
  entry: {
    entry: srcPath + '/index.js',
    vendor: [
      'react',
      'react-dom',
    ],
  },
  output: {
    publicPath: "/",
    path: distPath,
    filename: '[chunkhash].[name].js',
    // filename: 'app-[hash].js'
  },
  watch: true,
  resolve: {
    modules: [srcPath + '/node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                'es2015',
                'react',
              ],
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: srcPath + '/index.html',
      filename: distPath + '/index.html',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: (module) => {
        // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf('node_modules') !== -1
      },
    }),
    new CleanWebpackPlugin(['dist'], {
      root: srcPath,
      verbose: true,
      dry: false,
      exclude: [],
    })
    // new NpmInstallPlugin(),
  ],
}
