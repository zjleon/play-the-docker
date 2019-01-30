const PlayerControl = require('../EntityControl/player')
const CardControl = require('../EntityControl/card')
const {Map, Set, List} = require('immutable')
const {typeToMessage} = require('../../configs/constants')
const EventManager = require('../GeneralControl/eventManager')
const ROUND_INTERVAL = process.env.ROUND_INTERVAL
let timer = []

let currentRound
let housePlayerSeatNumber

exports.toNextRound = function() {
  // if (currentRound <= 4) {
  currentRound += 1
  switch (currentRound) {
  case 2:
    housePlayerSeatNumber = PlayerControl.getCurrentPlayer().seatNumber
    for (let i = 0, playerId; i < PlayerControl.maximamPlayer; i++) {
      playerId = PlayerControl.getCurrentPlayer().id
      PlayerControl.playerGetCard(playerId, CardControl.deal())
      PlayerControl.toNextPlayer()
    }
    CardControl.addSeedCard()
    timer.push(
      setTimeout(function() {
        exports.toNextRound()
      }, ROUND_INTERVAL)
    )
    break
  case 3:
  case 4:
    timer.push(
      setTimeout(function() {
        askPlayerToMakeDecision()
      }, 100)
    )
    break
  case 5:
    askPlayerToRevealCard()
    break
  default:
  }
  EventManager.publish(typeToMessage.GAME_ROUND, currentRound)
  // }
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

exports.playerReplaceCard = function(playerId, droppedCardId) {
  if (droppedCardId) {
    PlayerControl.recordDecision(playerId, typeToMessage.DROP_CARD)
    PlayerControl.playerDropCard(playerId, droppedCardId)
    CardControl.moveToAbandomZone(droppedCardId)
    setTimeout(() => PlayerControl.toNextPlayer(), 3000)
    return
  }
  PlayerControl.recordDecision(playerId, typeToMessage.REPLACE_CARD)
  PlayerControl.playerGetCard(playerId, CardControl.deal())
}

exports.playerAddSeedCard = function(playerId) {
  PlayerControl.recordDecision(playerId, typeToMessage.ADD_SEED_CARD)
  CardControl.addSeedCard()
  EventManager.publish(typeToMessage.PLAYER_STATE, PlayerControl.getPlayer(playerId))
  setTimeout(() => PlayerControl.toNextPlayer(), 3000)
}

exports.playerStay = function(playerId) {
  PlayerControl.recordDecision(playerId, typeToMessage.STAY)
  EventManager.publish(typeToMessage.PLAYER_STATE, PlayerControl.getPlayer(playerId))
  PlayerControl.toNextPlayer()
}

exports.playerGiveUp = function(playerId) {
  PlayerControl.recordDecision(playerId, typeToMessage.GIVE_UP)
  PlayerControl.giveUp(playerId)
  PlayerControl.toNextPlayer()
}

function askPlayerToRevealCard() {
  const playerId = PlayerControl.getCurrentPlayer().id
  PlayerControl.revealCard(playerId)
  PlayerControl.toPreviousPlayer()
}

function distributeSeedCards() {
  const availablePlayers = PlayerControl.getAvailablePlayers()
  delete availablePlayers.length
  let playerCards = Object.keys(availablePlayers).reduce((accumulator, playerId) => {
    const card = availablePlayers[playerId].cards[0]
    accumulator.order.push(card.number)
    // accumulator.order.sort()
    accumulator.mapping[card.number] = playerId
    return accumulator
  }, {
    order: [],
    mapping: {},
  })
  playerCards.order.sort((card1, card2) => card1 - card2)

  const pariedCards = CardControl.moveSeedCardToPlayer(playerCards)
  // move card to player
  Object.keys(pariedCards).forEach((playerId) => {
    PlayerControl.playerGetCard(playerId, pariedCards[playerId])
  })
}

EventManager.subscribe(typeToMessage.TO_NEXT_PLAYER, function(nextPlayerSeat) {
  if (currentRound === 3 || currentRound === 4) {
    if ( nextPlayerSeat === housePlayerSeatNumber) {
      timer.push(
        setTimeout(function() {
          exports.toNextRound()
        }, ROUND_INTERVAL)
      )
    } else {
      askPlayerToMakeDecision()
    }
  }
})
EventManager.subscribe(typeToMessage.TO_PREVIOUS_PLAYER, function(previousPlayerSeat) {
  if (currentRound === 5) {
    if ( previousPlayerSeat === housePlayerSeatNumber) {
      // distribute the seed cards
      distributeSeedCards()
    } else {
      timer.push(
        setTimeout(function() {
          askPlayerToRevealCard()
        }, 500)
      )
    }
  }
})
