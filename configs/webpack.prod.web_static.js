const babel = require('babel-loader')

module.exports = {
  entry: './src/web_static/index.js',
  output: {
    path: './dist/web_static',
    publicPath: "/assets/",
    filename: 'app.js'
  },
  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx'
    ]
  },
  module: {
    loaders: [{
      test: /\.js/,
      // loaders: ['babel-loader'],
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react']
      }
    }]
  },
  // plugins: [
  //   'transform-react-jsx-source',
  //   'transform-react-display-name',
  //   'transform-react-jsx',
  // ]
}
