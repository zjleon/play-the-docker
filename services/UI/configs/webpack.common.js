const webpack = require("webpack")
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs')
const packageJSON = require('../package.json')

const srcPath = path.resolve(__dirname, '../')
const distPath = path.resolve(__dirname, '../dist')
const publicPath = '/'

const {
  IMAGE_RESIZE_CONFIG,
} = require('./constants')

let envToClient = {
  IMAGE_RESIZE_CONFIG
}

const babelOptions = JSON.parse(fs.readFileSync('../.babelrc', 'utf8'))

module.exports = {
  entry: {
    main: [
      'babel-polyfill',
      srcPath + '/index.js',
    ],
  },
  output: {
    // XXX:also apply to html files
    // see https://webpack.js.org/configuration/output/#output-publicpath
    publicPath: publicPath,
    path: distPath,
    filename: '[name]-[hash].js',
    sourceMapFilename: '[name]-[hash].js.map',
    crossOriginLoading: "anonymous",
  },
  resolve: {
    modules: [srcPath + '/node_modules'],
  },
  // New in webpack 4, https://webpack.js.org/plugins/split-chunks-plugin/#configuration
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      automaticNameDelimiter: '-',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          enforce: true,
          chunks: 'all'
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions,
          },
        ],
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
      {
        test: /\.css$/,
        // include: [/node_modules/,'assets/scss'],
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: 'dashes',
              localIdentName: '[path][name]__[local]'
            }
          },
          {
            loader: 'resolve-url-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
    ]
  },
  plugins: [
    // options: https://github.com/jantimon/html-webpack-plugin#options
    new HtmlWebpackPlugin({
      template: srcPath + '/index.html',
      filename: distPath + '/index.html',
      // favicon: 'favicon.ico',
      minify: true
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.EnvironmentPlugin(envToClient),
  ],
  target: 'node'
}
