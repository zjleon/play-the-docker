import {messageTypes} from '../../configs/constants'
import {nextCardMayLargerThan, seedCardLargerThan, getKnownCards} from './utils'

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

export default function getDecision(knownConditions: conditions): {decision: string, data?: any} {
  let result = {
    decision: messageTypes.REPLACE_CARD,
  }
  if (
    (
      seedCardLargerThan(12, knownConditions.publicCards) ||
      nextCardMayLargerThan(12, getKnownCards(knownConditions))
    ) &&
    (
      knownConditions.teammateCard && knownConditions.teammateCard.number < 4 ||
      knownConditions.myCard.number < 4
    )
  ) {
    result.decision = messageTypes.ADD_SEED_CARD
  }

  return result
}