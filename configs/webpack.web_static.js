module.exports = {
  entry: './src/web_static/index.js',
  output: {
    path: './dist',
    filename: 'web_static.app[hash].js'
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
      test: /\.js|jsx$/,
      loaders: ['babel'],
      exclude: /node_modules/,
    }]
  },
  // plugins: [
  //   'transform-react-jsx-source',
  //   'transform-react-display-name',
  //   'transform-react-jsx',
  // ]
}
