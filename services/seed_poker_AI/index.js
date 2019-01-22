const express = require('express')
const app = express()
const port = process.env.PORT
const babelConfigs = require('./configs/babel.config')
require('@babel/register')(babelConfigs)

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.get('/', (req, res) => res.send(404, 'No such link'))
app.get('/fillInAI', (req, res) => {

})

app.listen(port, '0.0.0.0', () => console.log(`app listening on port ${port}!`))
