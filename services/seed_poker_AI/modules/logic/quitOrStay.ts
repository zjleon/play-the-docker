import {seedCardLessThan, getUnKnownCards, getKnownCards} from './utils'
import {decision, conditions} from '../../configs/declaration'

export default function getDecision(knownConditions: conditions): decision {
  let result = {
    decision: 'GIVE_UP',
  }
  let unKnownCards = getUnKnownCards(knownConditions).sort((card1, card2) => card1.number - card2.number)
  // const knownCards = getKnownCards(knownConditions)
  let givenUpPlayerAmount = 0
  let teammateGivenUp = false
  if ( knownConditions.givenUpPlayers) {
    // check is the teammat given up
    teammateGivenUp = !!knownConditions.givenUpPlayers.find((playerId) => playerId === knownConditions.teammateCard.id)
    givenUpPlayerAmount = teammateGivenUp ? knownConditions.givenUpPlayers.length - 1 : knownConditions.givenUpPlayers.length
  }
  if (seedCardLessThan(4, getKnownCards(knownConditions))) {
    //
    unKnownCards.splice(1, givenUpPlayerAmount)
  } else {
    unKnownCards.splice(unKnownCards.length - 1 - givenUpPlayerAmount, givenUpPlayerAmount)
  }
  const indexes = unKnownCards.reduce((accumulator, card, index) => {
    if (accumulator.mine === -1 && knownConditions.myCard.number <= card.number) {
      accumulator.mine = index
    }
    if (
      accumulator.teammate === -1 &&
      !teammateGivenUp &&
      knownConditions.teammateCard &&
      knownConditions.teammateCard.number <= card.number
    ) {
      accumulator.teammate = index
    }
    return accumulator
  }, {
    mine: -1,
    teammate: -1,
  })
  if(indexes.mine === -1) {
    indexes.mine = unKnownCards.length
  }
  if(indexes.teammate === -1) {
    indexes.teammate = unKnownCards.length
  }
  let seedCards = knownConditions.publicCards.filter(card => card.state === 'seedCard').sort((card1, card2) => card2.number - card1.number)
  let sum = {
    mine: knownConditions.myCard.number,
    teammate: knownConditions.teammateCard && !teammateGivenUp ? knownConditions.teammateCard.number : 0
  }
  if (seedCards[indexes.mine]) {
    sum.mine += seedCards[indexes.mine].number
    seedCards.splice(indexes.mine, 1)
  }
  if (seedCards[indexes.teammate]) {
    sum.teammate += seedCards[indexes.teammate].number
    seedCards.splice(indexes.teammate, 1)
  }
  seedCards.forEach((card, index) => {
    unKnownCards[index].number += card.number
  })
  unKnownCards.sort((card1, card2) => card2.number - card1.number)
  if(sum.mine >= unKnownCards[0].number && sum.mine > sum.teammate) {
    result.decision = 'STAY'
  }

  return result
}