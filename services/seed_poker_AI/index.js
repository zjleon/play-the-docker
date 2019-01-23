const babelConfigs = require('./configs/babel.config')
require('@babel/register')(babelConfigs)
const express = require('express')
const app = express()
const port = process.env.PORT
const AIControl = require('./modules/AIControl.ts').default

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.type('json')
  next()
})

app.get('/', (req, res) => res.send(404, 'No such link'))
app.get('/fillInAI', (req, res) => {
  AIControl.fillInAI().then(() => {
    res.send('123')
  })
    .catch((error) => {
      res.send(500, error)
    })
})

app.listen(port, '0.0.0.0', () => console.log(`app listening on port ${port}!`))
