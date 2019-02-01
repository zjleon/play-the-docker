const typeToMessage = {
  // server to monitor and player(AI)
  GAME_ROUND: 'gameRound',
  GAME_STATE: [
    {
      DEFAULT: 'Game not start',
      JOINT: 'You have joint the game, waiting for other players',
    },
    {
      DEFAULT: 'Check your card, next round will start soon',
    },
    {
      DEFAULT: 'Waiting for other player',
      MAKE_DECISION: 'Please make decision',
    },
    {
      DEFAULT: 'Game ends',
    }
  ],
  TO_NEXT_PLAYER: 'toNextPlayer',
  TO_PREVIOUS_PLAYER: 'toPreviousPlayer',
  WINNER: 'winner',
  ERROR: 'error',
  // server to monitor
  PLAYERS_STATE: 'playersState',
  CARDS_STATE: 'cardsState',
  // ABANDOM_ZONE_STATE: 'abandomZoneState',
  // SEED_CARD_ZONE_STATE: 'seedCardZoneState',
  // DEALER_STACK_STATE: 'dealerStackState',
  // server to player(AI)
  PLAYER_STATE: 'playerState',
  NEED_TO_MAKE_DECISION: 'needToMakeDecision',
  HOLDING_CARD: 'holdingCard',
  RECEIVE_CARD: 'receiveCard',
  // player(AI) to server
  REPLACE_CARD: 'replaceCard',
  DROP_CARD: 'dropCard',
  ADD_SEED_CARD: 'addSeedCard',
  STAY: 'stay',
  GIVE_UP: 'giveUp',
  JOIN_GAME: 'joinGame',
  ADD_AI: 'addAI',
  // GET_REMAINING_SEATS: 'getRemainingSeats',
  // monitor to server,
  MONITOR_JOIN: 'monitorJoin',
}

const messageToType = Object.keys(typeToMessage)
  .reduce(
    (accumulator, type) => {
      accumulator[typeToMessage[type]] = type
      return accumulator
    },
    {}
  )

// const GAME_STATE_NOT_START = 'game not start'
// const GAME_STATE_WAITING_FOR = 'waiting for other player'
// const GAME_STATE_MAKE_DECISION = 'please make decision'
// const GAME_STATE_END = 'game is end'

module.exports = {
  messageToType,
  typeToMessage,
}
