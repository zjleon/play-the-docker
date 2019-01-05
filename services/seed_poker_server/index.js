const express = require('express')
const app = express()
const expressWs = require('express-ws')(app)
const port = process.env.PORT
const {messageToType} = require('./modules/Shared/messageType')

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/getMessageTypes', (req, res) => {
  res.send(messageTypes)
})

// allowcate player number and seat
app.ws('/game', function(ws, req) {
  ws.on('message', function(msg) {
    // ws.send(msg)
    console.log('msg', msg)
  })
})

app.listen(port, () => console.log(`app listening on port ${port}!`))
