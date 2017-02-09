const webpack = require("webpack")
const config = require('./configs/webpack.prod.web_static')
const compiler = webpack(config)

compiler.run(function(error, stats) {
  if (stats.hasErrors()) {
    console.log(JSON.stringify(stats.toJson('errors-only'), null, 4))
  } else {
    console.log('build web_static sucess')
    console.log('output to:' + config.output.path)
  }
})
