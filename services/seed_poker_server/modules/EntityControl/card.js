const {Map, List} = require('immutable')
const {typeToMessage} = require('../../configs/constants')
const EventManager = require('../GeneralControl/eventManager')

const IN_PLAYER = 'inPlayer'
const IN_STACK = 'inStack'
const ABANDOMED = 'abandomed'
const SEED_CARD = 'seedCard'
const IN_PLAYER_AND_REVEALED = 'inPlayerAndRevealed'
const cardEntity = Map({
  id: null,
  number: null,
  state: IN_STACK,
})
const maximamCard = parseInt(process.env.MAX_PLAYER, 10) * 2 + 1
let cards

// pick one available card randomly
exports.deal = function() {
  const remainedCards = cards.filter(card => card.get('state') === IN_STACK)
  const randomIndex = Math.round(Math.random() * (remainedCards.size - 1))
  const pickedCard = remainedCards.get(randomIndex)
  cards = cards.setIn([pickedCard.get('id'), 'state'], IN_PLAYER)
  return cards.get(pickedCard.get('id')).toJS()
}

exports.reset = function() {
  cards = List((new Array(maximamCard)).fill(1)
    .map((value, index) => {
      return cardEntity.merge({
        id: index,
        number: index + 1,
      })
    })
  )
}

exports.addSeedCard = function() {
  const remainedCards = cards.filter(card => card.get('state') === IN_STACK)
  const randomIndex = Math.round(Math.random() * (remainedCards.size - 1))
  const pickedCard = remainedCards.get(randomIndex)
  cards = cards.setIn([pickedCard.get('id'), 'state'], SEED_CARD)
  const seedCards = exports.getSeedCards()
  if (seedCards.length > 3) {
    let lowestSeedCardIndex = seedCards.reduce((accumulator, card) => {
      return accumulator < card.id ? accumulator : card.id
    }, seedCards[0].id)
    cards = cards.setIn([lowestSeedCardIndex, 'state'], ABANDOMED)
  }
  EventManager.publish(typeToMessage.CARDS_STATE, cards.toJS())
  return cards.get(pickedCard.get('id')).toJS()
}

exports.moveSeedCardToPlayer = function({order, mapping}) {
  const seedCards = exports.getSeedCards()
  return seedCards.reduce((accumulator, seedCard, index) => {
    if (order[index]) {
      cards = cards.setIn([seedCard.id, 'state'], IN_PLAYER_AND_REVEALED)
      accumulator[mapping[order[index]]] = cards.get(seedCard.id)
    }
    return accumulator
  }, {})
}

exports.moveToAbandomZone = function(cardId) {
  cards = cards.setIn([cardId, 'state'], ABANDOMED)
  EventManager.publish(typeToMessage.CARDS_STATE, cards.toJS())
  return cards.get(cardId).toJS()
}

exports.revealCard = function(cardId) {
  cards = cards.setIn([cardId, 'state'], IN_PLAYER_AND_REVEALED)
  EventManager.publish(typeToMessage.CARDS_STATE, cards.toJS())
  return cards.get(cardId).toJS()
}

exports.getCards = function() {
  return cards.toJS()
}
exports.getSeedCards = function() {
  return cards.filter(card => card.get('state') === SEED_CARD)
    .toJS()
    .sort((card1, card2) => card2.number - card1.number)
}
exports.getDealerCards = function() {
  return cards.filter(card => card.get('state') === IN_STACK)
    .toJS()
}
exports.getAbandomCards = function() {
  return cards.filter(card => card.get('state') === ABANDOMED)
    .toJS()
    .sort((card1, card2) => card2.number - card1.number)
}
