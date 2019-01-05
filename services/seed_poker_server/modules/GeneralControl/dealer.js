const PlayerControl = require('../EntityControl/player')
const CardControl = require('../EntityControl/card')
const {Map, Set, List} = require('immutable')
const {typeToMessage, EventManager} = require('../GeneralControl/messageType')
const intervalBetweenRounds = 10000

let currentRound
let housePlayerSeatNumber
let decisions
exports.toNextRound = function() {
  // TODO: add more logic to detect if the game can process to next round
  if (currentRound <= 4) {
    currentRound += 1
    EventManager.publish(typeToMessage.GAME_ROUND, currentRound)
  }
  switch (currentRound) {
  case 2:
    housePlayerSeatNumber = PlayerControl.getCurrentPlayer().seatNumber
    for (let i = 0; i < PlayerControl.maximamPlayer; i++) {
      PlayerControl.playerGetCard(CardControl.deal())
      PlayerControl.toNextPlayer()
    }
    CardControl.addSeedCard()
    setTimeout(function() {
      exports.toNextRound()
    }, intervalBetweenRounds)
    break
  case 3:
    askPlayerToMakeDecision()
    break
  default:
  }
}

exports.resetGame = function() {
  currentRound = 1
  housePlayerId = null
  PlayerControl.clear()
  CardControl.reset()
  decisions = List()
}
exports.resetGame()

exports.getCurrentRound = function() {
  return currentRound
}

EventManager.subscribe(typeToMessage.PLAYERS_STATE, function(data) {
  if (currentRound === 1 && data.length === PlayerControl.maximamPlayer) {
    exports.toNextRound()
  }
})

function askPlayerToMakeDecision() {
  EventManager.publish(typeToMessage.NEED_TO_MAKE_DECISION, PlayerControl.getCurrentPlayer())
}

exports.playerReplaceCard = function(playerID, droppedCardId) {
  if (droppedCardId) {
    PlayerControl.playerDropCard(playerID, droppedCardId)
    CardControl.moveToAbandomZone(droppedCardId)
    PlayerControl.recordDecision(playerID, typeToMessage.DROP_CARD)
    PlayerControl.toNextPlayer()
  }
  PlayerControl.playerGetCard(CardControl.deal())
  PlayerControl.recordDecision(playerID, typeToMessage.REPLACE_CARD)
}

exports.playerAddSeedCard = function(playerID) {
  CardControl.addSeedCard()
  PlayerControl.recordDecision(playerID, typeToMessage.ADD_SEED_CARD)
  PlayerControl.toNextPlayer()
}

EventManager.subscribe(typeToMessage.TO_NEXT_PLAYER, function(nextPlayerSeat) {
  if (currentRound === 3) {
    if ( nextPlayerSeat === housePlayerSeatNumber) {
      exports.toNextRound()
    } else {
      askPlayerToMakeDecision()
    }
  }
})
