const typeToMessage = {
  // server to monitor and player
  GAME_ROUND: 'gameRound',
  GAME_STATE: 'gameState',
  TO_NEXT_PLAYER: 'toNextPlayer',
  ERROR: 'error',
  // server to monitor
  PLAYERS_STATE: 'playersState',
  CARDS_STATE: 'cardsState',
  // ABANDOM_ZONE_STATE: 'abandomZoneState',
  // SEED_CARD_ZONE_STATE: 'seedCardZoneState',
  // DEALER_STACK_STATE: 'dealerStackState',
  // server to player
  // PLAYER_STATE: 'playerState',
  NEED_TO_MAKE_DECISION: 'needToMakeDecision',
  HOLDING_CARD: 'holdingCard',
  RECEIVE_CARD: 'receiveCard',
  // player to server
  REPLACE_CARD: 'replaceCard',
  DROP_CARD: 'dropCard',
  ADD_SEED_CARD: 'addSeedCard',
  JOIN_GAME: 'joinGame',
}

const messageToType = Object.keys(typeToMessage)
  .reduce(
    (accumulator, type) => {
      accumulator[typeToMessage[type]] = type
      return accumulator
    },
    {}
  )

const EventManager = new (function() {
  let events = {}

  this.publish = function(name, data) {
    let handlers = events[name]
    if (!!handlers === false) return
    handlers.forEach(function(handler) {
      handler.call(this, data)
    })
  }

  this.subscribe = function(name, handler) {
    let handlers = events[name]
    if (!!handlers === false) {
      handlers = events[name] = []
    }
    handlers.push(handler)
  }

  this.unsubscribe = function(name, handler) {
    let handlers = events[name]
    if (!!handlers === false) return

    let handlerIdx = handlers.indexOf(handler)
    handlers.splice(handlerIdx)
  }
})

module.exports = {
  messageToType,
  typeToMessage,
  EventManager,
}
