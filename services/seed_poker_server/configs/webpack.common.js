const webpack = require("webpack")
const path = require('path')
const fs = require('fs')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')

const srcPath = path.resolve(__dirname, '../')
const distPath = path.resolve(__dirname, '../dist')

const dotenv = require('dotenv')
const envToClient = dotenv.parse(fs.readFileSync(`${srcPath}/.env.${process.env.NODE_ENV ? process.env.NODE_ENV : 'development'}`))

const babelOptions = require('./babel.config.js')

module.exports = {
  target: 'node',
  entry: {
    main: srcPath + '/index.js',
  },
  output: {
    // XXX:also apply to html files
    // see https://webpack.js.org/configuration/output/#output-publicpath
    // publicPath: publicPath,
    path: distPath,
    filename: '[name]-[hash].js',
    // sourceMapFilename: '[name]-[hash].js.map',
  },
  resolve: {
    modules: [srcPath + '/node_modules'],
  },
  // New in webpack 4, https://webpack.js.org/plugins/split-chunks-plugin/#configuration
  // optimization: {
  //   runtimeChunk: 'single',
  //   splitChunks: {
  //     automaticNameDelimiter: '-',
  //     cacheGroups: {
  //       vendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: 'vendors',
  //         enforce: true,
  //         chunks: 'all'
  //       }
  //     }
  //   }
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, path.resolve(srcPath, './configs')],
        use: {
          loader: 'babel-loader',
          options: babelOptions,
        },
      },
      {
        test: /\.ts(x?)$/,
        exclude: [/node_modules/, path.resolve(srcPath, './configs')],
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions
          },
          {
            loader: 'ts-loader'
          }
        ]
      },
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    // this plugin will convert process.env.xxx to related string
    // new webpack.EnvironmentPlugin(envToClient),
    new CaseSensitivePathsPlugin(),
  ],
}
