const uuidv4 = require('uuid/v4')
const {Map, Set, List} = require('immutable')
const {typeToMessage, EventManager} = require('../GeneralControl/messageType')

const maximamPlayer = parseInt(process.env.MAX_PLAYER, 10)
exports.maximamPlayer = maximamPlayer

const playerEntity = Map({
  id: 0,
  name: 'player',
  seatNumber: 0,
  cards: List([]),
  decisions: List([]),
  hasGivenUp: false,
})

let players = Map({length: 0})
let availableSeats = Set((new Array(maximamPlayer)).fill(1).map((item, index) => index + 1))
let currentPlayerSeatNumber = null

exports.join = function() {
  // TODO: only allow join in prepare phase,
  // what about AI replace player when he left
  const minimumSeatNumber = availableSeats.min()
  const newPlayer = playerEntity.merge({
    id: uuidv4(),
    name: 'player' + (Math.floor(Math.random() * 1000)),
    seatNumber: minimumSeatNumber,
  })
  players = players.set(newPlayer.get('id'), newPlayer)
    .set('length', players.get('length') + 1)
  availableSeats = availableSeats.delete(minimumSeatNumber)
  // set player as house
  if (players.get('length') === 0 || Math.random() > 0.4) {
    currentPlayerSeatNumber = minimumSeatNumber
  }
  EventManager.publish(typeToMessage.PLAYERS_STATE, players.toJS())
  return newPlayer.toJS()
}

exports.leave = function(playerID) {
  if (players.get(playerID) && players.get('length') > 0) {
    const originalPlayer = players.get(playerID)
    const seatNumber = originalPlayer.get('seatNumber')
    availableSeats = availableSeats.add(seatNumber)
    players = players.delete(playerID)
      .set('length', players.get('length') - 1)
    EventManager.publish(typeToMessage.PLAYERS_STATE, players.toJS())
    return originalPlayer.toJS()
  }
  return null
}

exports.clear = function() {
  players = Map({length: 0})
  availableSeats = Set((new Array(maximamPlayer)).fill(1).map((item, index) => index + 1))
  currentPlayerSeatNumber = null
  EventManager.publish(typeToMessage.PLAYERS_STATE, players.toJS())
}

exports.getPlayers = function() {
  return players.toJS()
}

exports.getCurrentPlayer = function() {
  const result = players.find((player) => {
    return player.get ? player.get('seatNumber') === currentPlayerSeatNumber : false
  })
  return result ? result.toJS() : null
}

exports.toNextPlayer = function() {
  if (currentPlayerSeatNumber + 1 > maximamPlayer) {
    currentPlayerSeatNumber = 1
  } else {
    currentPlayerSeatNumber = currentPlayerSeatNumber + 1
  }
  EventManager.publish(typeToMessage.TO_NEXT_PLAYER, currentPlayerSeatNumber)
}

exports.playerGetCard = function(card) {
  const playerId = exports.getCurrentPlayer().id
  players = players.updateIn([playerId, 'cards'], cards => cards.push(card))
  EventManager.publish(typeToMessage.PLAYERS_STATE, players.toJS())
  EventManager.publish(typeToMessage.PLAYER_STATE, players.get(playerId).toJS())
}

exports.playerDropCard = function(playerId, card) {
  players = players.updateIn([playerId, 'cards'], cards => {
    const cardIndex = cards.findKey(holdingCard => card.id === holdingCard.id)
    return cards.delete(cardIndex)
  })
  EventManager.publish(typeToMessage.PLAYERS_STATE, players.toJS())
  EventManager.publish(typeToMessage.PLAYER_STATE, players.get(playerId).toJS())
}

exports.recordDecision = function(decision) {
  currentPlayer = exports.getCurrentPlayer()
  players = players.updateIn([currentPlayer.id, 'decisions'], decisions => {
    const record = {
      decision,
      time: Date.now(),
    }
    return decisions.push(record)
  })
}

exports.giveUp = function() {

}
