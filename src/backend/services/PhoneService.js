class PhoneService {
  constructor(request, ws) {
    console.log((new Date()) + ' Connection accepted.')
    this.connection = request.accept('echo-protocol', request.origin)
    this.connection.on('message', this.onMessageReceive.bind(this))
    this.connection.on('close', this.onClose.bind(this))
    this.ws = ws
  }

  onMessageReceive(message) {
    let data = JSON.parse(message[message.type + 'Data'])

    if (data.phone && this.ws.phone) {
      console.log('phone')
      this.ws.phone.sendUTF('this is from phone')
    }
    if (data.tv && this.ws.tv) {
      console.log('tv')
      this.ws.tv.sendUTF('this is from tv')
    }
  }

  onClose(reasonCode, description) {
    console.log((new Date()) + ' Peer ' + this.connection.remoteAddress + ' disconnected.')
  }
}

module.exports = PhoneService
