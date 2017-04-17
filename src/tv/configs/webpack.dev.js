const webpack = require("webpack")
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// const NpmInstallPlugin = require('npm-install-webpack-plugin')

const srcPath = path.resolve('.')
const distPath = path.resolve('./dist')
const fs = require('fs')
const projectConfigs = JSON.parse(fs.readFileSync('./package.json', 'utf8'))
let envFile = fs.readFileSync('.env', 'utf8')
let envToClient = {}
envFile.replace(/(\w+)=((\d+)|.+)/g, function($0, $1, $2, $3) {
  envToClient[$1] = $3 ? Number($3) : $2
})

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
    new webpack.EnvironmentPlugin(envToClient),
    // new NpmInstallPlugin(),
  ],
  devServer: {
    hot: true,
    contentBase: distPath,
    publicPath: '/',
  },
  watch: true,
  watchOptions: {
    ignored: ['/node_modules/', distPath]
  },
  devtool: 'source-map',
}
