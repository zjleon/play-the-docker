const path = require('path')
const webpack = require("webpack")
const merge = require('webpack-merge')
const commonWebpackConfig = require('./webpack.common')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const NpmInstallPlugin = require('npm-install-webpack-plugin')

const {
  envs,
} = require('./constants')
const gulpGeneratedPath = path.resolve(__dirname, './gulpGenerated')
const gulpTasksPath = path.resolve(__dirname, './gulp')
const routeFilePath = path.resolve(__dirname, '../modules/Routers/routes.js')

const devSettings = {
  mode: 'development',
  entry: {
    main: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:' + envs.PORT,
      'webpack/hot/only-dev-server',
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.SourceMapDevToolPlugin({
      exclude: ['node_modules'],
    }),
    // new NpmInstallPlugin(),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static',
    //   openAnalyzer: false,
    // }),
  ],
  devServer: {
    hot: true,
    host: '0.0.0.0',
    contentBase: [commonWebpackConfig.output.path],
    publicPath: commonWebpackConfig.output.publicPath,
    disableHostCheck: true,
    before: function(app) {
      app.all('*', function(req, res, next) {
        // console.log('req headers', req.headers)
        // console.log('req path', req.path)
        // console.log('req query', req.query)
        next()
      })
    },
    historyApiFallback: {
      rewrites: [
        { from: /.+/, to: '/' },
      ],
      verbose: true,
    },
  },
  watch: true,
  watchOptions: {
    ignored: [
      'node_modules',
      commonWebpackConfig.output.distPath,
      gulpGeneratedPath,
      gulpTasksPath,
      routeFilePath,
    ],
    poll: 1000,
    aggregateTimeout: 500,
  },
  devtool: 'eval',
}

module.exports = merge.strategy(
  {
    'entry.main': 'prepend', // or 'replace', defaults to 'append'
  }
)(commonWebpackConfig, devSettings)
