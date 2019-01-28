const PlayerControl = require('../EntityControl/player')
const CardControl = require('../EntityControl/card')
const {Map, Set, List} = require('immutable')
const {typeToMessage} = require('../../configs/constants')
const EventManager = require('../GeneralControl/eventManager')
const intervalBetweenRounds = 10000
let timer = []

let currentRound
let housePlayerSeatNumber

exports.toNextRound = function() {
  if (currentRound <= 4) {
    currentRound += 1
    switch (currentRound) {
    case 2:
      housePlayerSeatNumber = PlayerControl.getCurrentPlayer().seatNumber
      for (let i = 0; i < PlayerControl.maximamPlayer; i++) {
        PlayerControl.playerGetCard(CardControl.deal())
        PlayerControl.toNextPlayer()
      }
      CardControl.addSeedCard()
      timer.push(
        setTimeout(function() {
          exports.toNextRound()
        }, intervalBetweenRounds)
      )
      break
    case 3:
      timer.push(
        setTimeout(function() {
          askPlayerToMakeDecision()
        }, 100)
      )
      break
    default:
    }
    EventManager.publish(typeToMessage.GAME_ROUND, currentRound)
  }
}

exports.resetGame = function() {
  timer.forEach(t => clearTimeout(t))
  currentRound = 1
  PlayerControl.clear()
  CardControl.reset()
}
exports.resetGame()

exports.getCurrentRound = function() {
  return currentRound
}

EventManager.subscribe(typeToMessage.PLAYERS_STATE, function(data) {
  if (currentRound === 1 && data.length === PlayerControl.maximamPlayer) {
    // make sure all ws connections are ready
    timer.push(
      setTimeout(() => {
        exports.toNextRound()
      }, 50)
    )
  }
})

function askPlayerToMakeDecision() {
  EventManager.publish(typeToMessage.NEED_TO_MAKE_DECISION, PlayerControl.getCurrentPlayer())
}

exports.playerReplaceCard = function(playerID, droppedCardId) {
  if (droppedCardId) {
    PlayerControl.recordDecision(playerID, typeToMessage.DROP_CARD)
    PlayerControl.playerDropCard(playerID, droppedCardId)
    CardControl.moveToAbandomZone(droppedCardId)
    setTimeout(() => PlayerControl.toNextPlayer(), 3000)
    return
  }
  PlayerControl.recordDecision(playerID, typeToMessage.REPLACE_CARD)
  PlayerControl.playerGetCard(CardControl.deal())
}

exports.playerAddSeedCard = function(playerID) {
  PlayerControl.recordDecision(playerID, typeToMessage.ADD_SEED_CARD)
  CardControl.addSeedCard()
  setTimeout(() => PlayerControl.toNextPlayer(), 3000)
}

EventManager.subscribe(typeToMessage.TO_NEXT_PLAYER, function(nextPlayerSeat) {
  if (currentRound === 3) {
    if ( nextPlayerSeat === housePlayerSeatNumber) {
      timer.push(
        setTimeout(function() {
          exports.toNextRound()
        }, intervalBetweenRounds)
      )
    } else {
      askPlayerToMakeDecision()
    }
  }
})
