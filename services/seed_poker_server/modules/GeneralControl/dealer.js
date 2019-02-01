const PlayerControl = require('../EntityControl/player')
const CardControl = require('../EntityControl/card')
const {Map, Set, List} = require('immutable')
const {typeToMessage} = require('../../configs/constants')
const EventManager = require('../GeneralControl/eventManager')
const roundInterval = parseInt(process.env.ROUND_INTERVAL, 10)
const actionInterval = parseInt(process.env.ACTION_INTERVAL, 10)
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
      }, roundInterval)
    )
    break
  case 3:
  case 4:
    timer.push(
      setTimeout(function() {
        askPlayerToMakeDecision()
      }, 10)
    )
    break
  case 5:
    revealPlayerCard()
    break
  case 6:
    exports.getTheWinner()
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
      }, roundInterval)
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
    setTimeout(() => PlayerControl.toNextPlayer(), actionInterval)
    return
  }
  PlayerControl.recordDecision(playerId, typeToMessage.REPLACE_CARD)
  PlayerControl.playerGetCard(playerId, CardControl.deal())
}

exports.playerAddSeedCard = function(playerId) {
  PlayerControl.recordDecision(playerId, typeToMessage.ADD_SEED_CARD)
  CardControl.addSeedCard()
  EventManager.publish(typeToMessage.PLAYER_STATE, PlayerControl.getPlayer(playerId))
  setTimeout(() => PlayerControl.toNextPlayer(), actionInterval)
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

function revealPlayerCard() {
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
  timer.push(
    setTimeout(function() {
      exports.toNextRound()
    }, roundInterval)
  )
}

exports.getTheWinner = function() {
  let players = PlayerControl.getAvailablePlayers()
  delete players.length
  const winner = Object.keys(players).reduce((accumulator, playerId) => {
    const playerTotalNumber = players[playerId].cards.reduce((totalNumber, card) => totalNumber + card.number, 0)
    if (accumulator.number <= playerTotalNumber) {
      const distanceFromHouse = (
        players[playerId].seatNumber < housePlayerSeatNumber ?
          players[playerId].seatNumber + housePlayerSeatNumber
          :
          players[playerId].seatNumber
      ) - housePlayerSeatNumber
      // if there are quivalent numbers,
      // the player closer to the right side of the house win
      if (
        accumulator.number === playerTotalNumber &&
        accumulator.distanceFromHouse &&
        accumulator.distanceFromHouse < distanceFromHouse
      ) return accumulator
      accumulator.playerId = players[playerId].id
      accumulator.number = playerTotalNumber
      accumulator.distanceFromHouse = distanceFromHouse
    }
    return accumulator
  }, {playerId: '', number: 0, distanceFromHouse: 0})
  EventManager.publish(typeToMessage.WINNER, winner)
  return winner
}

EventManager.subscribe(typeToMessage.TO_NEXT_PLAYER, function(nextPlayerSeat) {
  if (currentRound === 3 || currentRound === 4) {
    if ( nextPlayerSeat === housePlayerSeatNumber) {
      timer.push(
        setTimeout(function() {
          exports.toNextRound()
        }, roundInterval)
      )
    } else {
      askPlayerToMakeDecision()
    }
  }
})
EventManager.subscribe(typeToMessage.TO_PREVIOUS_PLAYER, function(previousPlayerSeat) {
  if (currentRound === 5) {
    if ( previousPlayerSeat === housePlayerSeatNumber) {
      timer.push(
        setTimeout(function() {
          distributeSeedCards()
        }, 500)
      )
    } else {
      timer.push(
        setTimeout(function() {
          revealPlayerCard()
        }, 500)
      )
    }
  }
})
