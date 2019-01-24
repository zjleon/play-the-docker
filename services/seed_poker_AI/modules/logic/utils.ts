interface card {
  id: string,
  number: number,
  state: string,
}
interface conditions {
  publicCards: card[],
  maximamNumber: number,
  myCard: card,
  teammateCard: card,
}

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
export function getKnownCards(knownConditions: conditions): card[] {
  let result = []
  knownConditions.publicCards.filter(card => card.state === 'abandomed' || card.state === 'seedCard')
  // result.concat()
    .push(knownConditions.myCard)
  knownConditions.teammateCard ? result.push(knownConditions.teammateCard): null
  return result
}