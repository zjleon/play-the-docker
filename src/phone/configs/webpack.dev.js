const webpack = require("webpack")
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// const NpmInstallPlugin = require('npm-install-webpack-plugin')

const srcPath = path.resolve('.')
const distPath = path.resolve('./dist')
const fs = require('fs')
const projectConfigs = JSON.parse(fs.readFileSync('./package.json', 'utf8'))
// XXX: in docker compose env, all request should be point to 3000 ports, which nginx lives
const devServerEndPoint = process.env.DOCKER_ENV ?
  'webpack-dev-server/client?http://localhost:3000' + '/' + process.env.PROJECT_ID
  :
  'webpack-dev-server/client?http://localhost:' + process.env.PORT
const publicPath = process.env.DOCKER_ENV ? "/" + process.env.PROJECT_ID : '/'
let envFile = fs.readFileSync('.env', 'utf8')
let envToClient = {
  DOCKER_ENV: process.env.DOCKER_ENV || 0,
}
envFile.replace(/(\w+)=((\d+)|.+)/g, function($0, $1, $2, $3) {
  envToClient[$1] = $3 ? Number($3) : $2
})

module.exports = {
  entry: {
    main: [
      'react-hot-loader/patch',
      devServerEndPoint,
      'webpack/hot/only-dev-server',
      'babel-polyfill',
      srcPath + '/index.js',
    ],
    vendor: [
      'react-hot-loader/patch',
      devServerEndPoint,
      'webpack/hot/only-dev-server',
      'babel-polyfill',
      'react',
      'react-dom',
    ],
  },
  output: {
    // XXX:also apply to html files
    // see https://webpack.js.org/configuration/output/#output-publicpath
    publicPath: publicPath,
    path: distPath,
    filename: '[hash].[name].js',
    sourceMapFilename: '[hash].[name].js.map',
    crossOriginLoading: "anonymous",
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
    new webpack.EnvironmentPlugin(envToClient),
    // new NpmInstallPlugin(),
  ],
  devServer: {
    hot: true,
    host: '0.0.0.0',
    contentBase: distPath,
    publicPath: publicPath,
    disableHostCheck: true,
    setup: function(app) {
      app.all('*', function(req, res, next) {
        console.log('req headers', req.headers)
        console.log('req path', req.path)
        console.log('req query', req.query)
        next()
      })
    },
    // historyApiFallback: {
    //   rewrites: [
    //     { from: /.+/, to: '/' },
    //   ],
    //   verbose: true,
    // },
  },
  watch: true,
  watchOptions: {
    ignored: ['/node_modules/', distPath],
    poll: 1000,
    aggregateTimeout: 500,
  },
  devtool: 'source-map',
}
