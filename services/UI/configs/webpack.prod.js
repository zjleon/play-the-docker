const webpack = require("webpack")
const merge = require('webpack-merge')
const commonWebpackConfig = require('./webpack.common')
const CompressionPlugin = require('compression-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const productionSettings = {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new UglifyJSPlugin(),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      // threshold: 10240,
      minRatio: 0.8
    }),
  ]
}

module.exports = merge(commonWebpackConfig, productionSettings)
