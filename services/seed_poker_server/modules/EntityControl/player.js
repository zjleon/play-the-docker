const uuidv4 = require('uuid/v4')
const {Map, Set, List} = require('immutable')
const {typeToMessage} = require('../../configs/constants')
const EventManager = require('../GeneralControl/eventManager')
const CardControl = require('./card')

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

let players
let availableSeats
let currentPlayerSeatNumber

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

exports.getPlayer = function(playerId) {
  return players.get(playerId).toJS()
}

exports.getAvailablePlayers = function() {
  return players.filter((player) => player.get && !player.get('hasGivenUp')).toJS()
}

exports.getPlayerBySeatNumber = function(seatNumber) {
  return players.find((player) => player.seatNumber === seatNumber).toJS()
}

exports.getRemaingSeats = function() {
  return availableSeats.toSeq().toJS()
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

exports.toPreviousPlayer = function() {
  if (currentPlayerSeatNumber - 1 < 1) {
    currentPlayerSeatNumber = maximamPlayer
  } else {
    currentPlayerSeatNumber = currentPlayerSeatNumber - 1
  }
  EventManager.publish(typeToMessage.TO_PREVIOUS_PLAYER, currentPlayerSeatNumber)
}

exports.playerGetCard = function(playerId, card) {
  players = players.updateIn([playerId, 'cards'], cards => cards.push(card).sort((card1, card2) => card2 - card1))
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

exports.recordDecision = function(playerId, decision) {
  players = players.updateIn([playerId, 'decisions'], decisions => {
    const record = {
      name: decision,
      time: Date.now(),
    }
    return decisions.push(record)
  })
}

exports.giveUp = function(playerId) {
  players = players.setIn([playerId, 'hasGivenUp'], true)
  EventManager.publish(typeToMessage.PLAYERS_STATE, players.toJS())
  EventManager.publish(typeToMessage.PLAYER_GIVEN_UP, playerId)
  EventManager.publish(typeToMessage.PLAYER_STATE, players.get(playerId).toJS())
}

exports.revealCard = function(playerId) {
  const player = players.get(playerId)
  if (player.get('hasGivenUp')) return
  const newCardState = CardControl.revealCard(player.getIn(['cards', 0, 'id']))
  players = players.setIn([playerId, 'cards', 0], newCardState)

  EventManager.publish(typeToMessage.PLAYERS_STATE, players.toJS())
  EventManager.publish(typeToMessage.PLAYER_STATE, players.get(playerId).toJS())
}
