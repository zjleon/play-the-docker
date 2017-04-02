const directionAndMovement = require('./DirectionAndMovementService')

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
      console.log('phone:' + JSON.stringify(data.phone))
      if (data.phone.action === 'initializeDirection') {
        directionAndMovement.initializeDirection(data.phone.movements)
      } else {
        this.ws.phone.sendUTF('this is from phone')
      }
    }
    if (data.tv && this.ws.tv) {
      console.log('tv: ' + JSON.stringify(data.tv))
      if (data.tv.action === 'phoneMove') {
        data = directionAndMovement.getMovement(data.tv.movements)
        console.log(data)
        this.ws.tv.sendUTF(data)
      }
    }
  }

  onClose(reasonCode, description) {
    console.log((new Date()) + ' Peer ' + this.connection.remoteAddress + ' disconnected.')
    directionAndMovement.resetDirection()
  }
}

module.exports = PhoneService
