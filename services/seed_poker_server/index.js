const express = require('express')
const app = express()
const expressWs = require('express-ws')(app)
const port = process.env.PORT
const {typeToMessage} = require('./modules/GeneralControl/messageType')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/getMessageTypes', (req, res) => {
  res.type('json')
  res.send(JSON.stringify(typeToMessage))
})

// allowcate player number and seat
app.ws('/game', function(ws, req) {
  ws.on('open', function(msg) {
    console.log('111', msg)
  })
  ws.on('message', function(msg) {
    // ws.send(msg)
    console.log('msg', msg)
  })
})

app.listen(port, '0.0.0.0', () => console.log(`app listening on port ${port}!`))
