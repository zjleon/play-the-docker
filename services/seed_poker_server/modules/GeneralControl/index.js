const {messageToType} = require('../Shared/messageType')

exports.receiveMessage = function(message, actions) {
  switch (message) {
  case messageToType.JOIN_GAME:

    break
  case messageToType.DECISION:

    break
  default:
  }
}
