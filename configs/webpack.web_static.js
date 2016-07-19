module.exports = {
  // entry: './src/app.js',
  // output: {
  //     path: './bin',
  //     filename: 'app.bundle.js'
  // }
  // presets: [
  //   'es2015',
  //   'react'
  // ],
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
      loader: 'babel',
      exclude: /node_modules/,
    }]
  },
  // plugins: [
  //   'transform-react-jsx-source',
  //   'transform-react-display-name',
  //   'transform-react-jsx',
  // ]
}
