import {card, conditions} from '../../configs/declaration'

export function nextCardMayLowerThan(baseNumber: number, knownCards: card[]): boolean {
  return baseNumber - knownCards.filter(card => {
    return card.number < baseNumber
  }).length > 0
}
export function nextCardMayLargerThan(baseNumber: number, knownCards: card[]): boolean {
  return baseNumber - knownCards.filter(card => {
    return card.number > baseNumber
  }).length > 0
}
export function seedCardLargerThan(baseNumber: number, cards: card[]): boolean {
  return cards.filter((card) => card.state === 'seedCard' && card.number > baseNumber).length > 0
}
export function seedCardLessThan(baseNumber: number, cards: card[]): boolean {
  return cards.filter((card) => card.state === 'seedCard' && card.number < baseNumber).length > 0
}
export function getKnownCards(knownConditions: conditions): card[] {
  let result = knownConditions.publicCards.filter(card => card.state === 'abandomed' || card.state === 'seedCard')
  result.push(knownConditions.myCard)
  knownConditions.teammateCard ? result.push(knownConditions.teammateCard): null
  knownConditions.myLowerNumberCard ? result.push(knownConditions.myLowerNumberCard): null
  return result
}
export function getUnKnownCards(knownConditions: conditions): card[] {
  let result = knownConditions.publicCards.filter(card => card.state === 'inPlayer' || card.state === 'inStack')
  let index = result.findIndex((card) => card.number === knownConditions.myCard.number)
  result.splice(index, 1)
  if (knownConditions.teammateCard) {
    index = result.findIndex((card) => card.number === knownConditions.teammateCard.number)
    result.splice(index, 1)
  }
  if (knownConditions.myLowerNumberCard) {
    index = result.findIndex((card) => card.number === knownConditions.myLowerNumberCard.number)
    result.splice(index, 1)
  }
  return result
}