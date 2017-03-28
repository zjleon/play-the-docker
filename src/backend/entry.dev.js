let WebSocketServer = require('websocket').server
let http = require('http')
let tvService = require('./services/TVService')
let phoneService = require('./services/PhoneService')

let server = http.createServer(function(request, response) {
  console.log((new Date()) + ' Received request for ' + request.url)
  response.writeHead(404)
  response.end()
})
server.listen(process.env.PORT, '0.0.0.0', function() {
  console.log((new Date()) + ' Server is listening on port ' + process.env.PORT)
})

wsServer = new WebSocketServer({
  httpServer: server,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
  autoAcceptConnections: false
})

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true
}

wsServer.on('request', function(request) {
  if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin
    request.reject()
    console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.')
    return
  }

  let connection = request.accept('echo-protocol', request.origin)
  console.log((new Date()) + ' Connection accepted.')
  connection.on('message', function(message) {
    switch (message.device) {
    case 'tv':
      tvService.onMessageReceive(connection, message)
      break
    case 'phone':
      phoneService.onMessageReceive(connection, message)
      break
    default:

    }
    // if (message.device === 'tv') {
    //   // connection.sendUTF(message.utf8Data)
    //   phoneService.onMessageReceive(connection, message)
    // } else if (message.type === 'binary') {
    //   console.log('Received Binary Message of ' + message.binaryData.length + ' bytes')
    //   connection.sendBytes(message.binaryData)
    // }
  })
  connection.on('close', function(reasonCode, description) {
    console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.')
  })
})
