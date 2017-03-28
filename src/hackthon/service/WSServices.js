let W3CWebSocket = require('websocket').w3cwebsocket

let client = new W3CWebSocket(process.env.WSENDPOINT, 'echo-protocol')

client.onerror = function() {
  console.log('Connection Error')
}

client.onopen = function() {
  console.log('WebSocket Client Connected')

  const sendNumber = () => {
    if (client.readyState === client.OPEN) {
      let number = Math.round(Math.random() * 0xFFFFFF)
      client.send(number.toString())
      console.log(number.toString())
      setTimeout(sendNumber, 1000)
    }
  }
  sendNumber()
}

client.onclose = function() {
  console.log('echo-protocol Client Closed')
}

client.onmessage = function(e) {
  if (typeof e.data === 'string') {
    console.log("Received: '" + e.data + "'")
  }
}
