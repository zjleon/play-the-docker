class TVService {
  constructor(request, ws) {
    console.log((new Date()) + ' Connection accepted.')
    this.connection = request.accept('echo-protocol', request.origin)
    this.connection.on('message', this.onMessageReceive.bind(this))
    this.connection.on('close', this.onClose.bind(this))
    this.ws = ws
    // return this.connection
  }

  // initialize(request) {
  // }

  onMessageReceive(message) {
    let data = JSON.parse(message[message.type + 'Data'])

    // this.connection.sendUTF(data)
  }

  onClose(reasonCode, description) {
    console.log((new Date()) + ' Peer ' + this.connection.remoteAddress + ' disconnected.')
  }
}

module.exports = TVService
