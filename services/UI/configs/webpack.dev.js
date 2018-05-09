const webpack = require("webpack")
const merge = require('webpack-merge')
const commonWebpackConfig = require('./webpack.common')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const NpmInstallPlugin = require('npm-install-webpack-plugin')

const {
  PORT,
} = require('./constants')

const devSettings = {
  mode: 'development',
  entry: {
    main: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:' + PORT,
      'webpack/hot/only-dev-server',
    ],
    vendor: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:' + PORT,
      'webpack/hot/only-dev-server',
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.SourceMapDevToolPlugin({
      exclude: ['node_modules'],
    }),
    // new NpmInstallPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
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
  // watchOptions: {
  //   ignored: ['/node_modules/', distPath],
  //   poll: 1000,
  //   aggregateTimeout: 500,
  // },
  devtool: 'eval',
}

module.exports = merge.strategy(
  {
    'entry.main': 'prepend', // or 'replace', defaults to 'append'
    'entry.vendor': 'prepend', // or 'replace', defaults to 'append'
  }
)(commonWebpackConfig, devSettings)
