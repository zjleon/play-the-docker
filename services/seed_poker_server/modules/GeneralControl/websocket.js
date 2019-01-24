const PlayerControl = require('../EntityControl/player')
const {typeToMessage} = require('../../configs/constants')
const EventManager = require('../GeneralControl/eventManager')

let connections = {
  monitor: {},
  players: {},
}

// listen to events and send message to client
function broadcast(data) {
  const response = {
    message: typeToMessage.GAME_ROUND,
    data,
  }
  const allConnections = Object.assign({}, connections.monitor, connections.players)
  Object.keys(allConnections).forEach(function(connectionId) {
    allConnections[connectionId].send(JSON.stringify(response))
  })
}
// send message to all clients
EventManager.subscribe(typeToMessage.GAME_ROUND, broadcast)
EventManager.subscribe(typeToMessage.CARDS_STATE, broadcast)
EventManager.subscribe(typeToMessage.PLAYERS_STATE, function(players) {
  // console.log(typeToMessage.PLAYERS_STATE, players)
  //
})
// send message to particular player
EventManager.subscribe(typeToMessage.PLAYER_STATE, function(player) {
  const response = {
    message: typeToMessage.PLAYER_STATE,
    data: player,
  }
  connections.players[player.id].send(JSON.stringify(response))
})
EventManager.subscribe(typeToMessage.CARDS_STATE, broadcast)

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
  case typeToMessage.DECISION:

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
    } else {
      // delete monitor connection
    }
  })
}
