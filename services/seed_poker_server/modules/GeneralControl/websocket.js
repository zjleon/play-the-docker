const PlayerControl = require('../EntityControl/player')
const Dealer = require('../GeneralControl/dealer')
const {typeToMessage} = require('../../configs/constants')
const EventManager = require('../GeneralControl/eventManager')

let connections = {
  monitor: {},
  players: {},
}

// listen to events and send message to client
function broadcast(messageType, data) {
  const response = {
    message: typeToMessage[messageType],
    data,
  }
  const allConnections = Object.assign({}, connections.monitor, connections.players)
  Object.keys(allConnections).forEach(function(connectionId) {
    allConnections[connectionId].send(JSON.stringify(response))
  })
}
// send message to all clients, all monitors
EventManager.subscribe(typeToMessage.GAME_ROUND, data => broadcast('GAME_ROUND', data))
// player or AI need to get the stack card number
EventManager.subscribe(typeToMessage.CARDS_STATE, data => broadcast('CARDS_STATE', data))
EventManager.subscribe(typeToMessage.WINNER, data => broadcast('WINNER', data))
// send message to monitor
// EventManager.subscribe(typeToMessage.PLAYERS_STATE, data => broadcast('PLAYERS_STATE', data))
// EventManager.subscribe(typeToMessage.TO_PREVIOUS_PLAYER, data => broadcast('TO_PREVIOUS_PLAYER', data))
// send message to particular player
EventManager.subscribe(typeToMessage.PLAYER_STATE, function(player) {
  const response = {
    message: typeToMessage.PLAYER_STATE,
    data: player,
  }
  connections.players[player.id].send(JSON.stringify(response))
})
EventManager.subscribe(typeToMessage.NEED_TO_MAKE_DECISION, function(player) {
  const response = {
    message: typeToMessage.NEED_TO_MAKE_DECISION,
  }
  connections.players[player.id].send(JSON.stringify(response))
})


// handle messages from client
function receiveMessage(ws, message, data) {
  switch (message) {
  case typeToMessage.JOIN_GAME:
    const player = PlayerControl.join()
    ws.playerId = player.id
    connections.players[player.id] = ws
    let response = {
      message: typeToMessage.PLAYER_STATE,
      data: player,
    }
    ws.send(JSON.stringify(response))
    response = {
      message: typeToMessage.GAME_ROUND,
      data: 1,
    }
    ws.send(JSON.stringify(response))
    break
  case typeToMessage.REPLACE_CARD:
    Dealer.playerReplaceCard(ws.playerId)
    break
  case typeToMessage.DROP_CARD:
    Dealer.playerReplaceCard(ws.playerId, data)
    break
  case typeToMessage.ADD_SEED_CARD:
    Dealer.playerAddSeedCard(ws.playerId)
    break
  default:
  }
}

exports.wsHandler = function(ws, req) {
  ws.on('message', function(jsonObject) {
    const {message, data} = JSON.parse(jsonObject)
    receiveMessage(ws, message, data)
  })
  ws.on('close', function() {
    if (ws.playerId) {
      PlayerControl.leave(ws.playerId)
      delete connections.players[ws.playerId]
      if (!Object.keys(connections.players).length) {
        Dealer.resetGame()
      }
    } else {
      // delete monitor connection
    }
  })
}
