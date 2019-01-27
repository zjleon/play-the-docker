import {nextCardMayLargerThan, seedCardLargerThan, getKnownCards} from './utils'
import {card, decision} from '../../configs/declaration'

interface conditions {
  publicCards: card[],
  maximamNumber: number,
  myCard: card,
  teammateCard: card,
}

export default function getDecision(knownConditions: conditions): decision {
  let result = {
    decision: 'REPLACE_CARD',
  }
  const knownCards = getKnownCards(knownConditions)
  if (
    (
      seedCardLargerThan(12, knownCards) ||
      nextCardMayLargerThan(12, knownCards)
    ) &&
    (
      knownConditions.teammateCard && knownConditions.teammateCard.number < 4 ||
      knownConditions.myCard.number < 4
    )
  ) {
    result.decision = 'ADD_SEED_CARD'
  }

  return result
}