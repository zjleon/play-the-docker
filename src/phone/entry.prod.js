const express = require("express")

let app = express()
app.use(express.static('dist'))

app.listen(process.env.PORT, '0.0.0.0', function() {
  console.log('express started')
})

app.get('*', function(req, res, next) {
  req.url = 'index.html'
  next('route')
})

// const errorTrace = (err, stats) => {
//   if (err) {
//     console.error(err.stack || err)
//     if (err.details) {
//       console.error(err.details)
//     }
//     return
//   }
//
//   const info = stats.toJson()
//
//   if (stats.hasErrors()) {
//     console.error(info.errors)
//   }
//
//   if (stats.hasWarnings()) {
//     console.warn(info.warnings)
//   }
// }
