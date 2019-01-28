import {seedCardLessThan, getKnownCards} from './utils'
import {conditions, decision} from '../../configs/declaration'

export default function getDecision(knownConditions: conditions): decision {
  let result = {
    decision: 'DROP_CARD',
    card: knownConditions.myCard
  }
  const knownCards = getKnownCards(knownConditions)
  const stackCardLessThan4 = knownConditions.publicCards.filter((card) => card.state === 'seedCard').length < 4

  if (
    knownConditions.myCard.number > 12 &&
    seedCardLessThan(4, knownCards) &&
    stackCardLessThan4
  ) {
    result.card = knownConditions.myLowerNumberCard
  }

  return result
}
