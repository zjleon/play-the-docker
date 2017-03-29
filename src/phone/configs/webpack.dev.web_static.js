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
const Dotenv = require('dotenv-webpack')

module.exports = {
  entry: {
    main: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:' + process.env.PORT,
      'webpack/hot/only-dev-server',
      srcPath + '/index.js',
    ],
    vendor: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:' + process.env.PORT,
      'webpack/hot/only-dev-server',
      'react',
      'react-dom',
    ],
  },
  output: {
    // XXX:also apply to html files
    // see https://webpack.js.org/configuration/output/#output-publicpath
    publicPath: "/",
    path: distPath,
    filename: '[hash].[name].js',
    sourceMapFilename: '[hash].[name].js.map'
  },
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
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    // new NpmInstallPlugin(),
    new Dotenv({
      path: './' + process.env.NODE_ENV && process.env.NODE_ENV !== 'development' ? process.env.NODE_ENV : '' + '.env', // Path to .env file (this is the default)
      // safe: true, // load .env.example (defaults to "false" which does not use dotenv-safe)
    }),
  ],
  devServer: {
    hot: true,
    contentBase: distPath,
    publicPath: '/',
  },
  watch: true,
  devtool: 'source-map',
}
