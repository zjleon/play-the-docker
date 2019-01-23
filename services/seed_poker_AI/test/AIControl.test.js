const should = require('should')
const path = require('path')
const babelConfigs = require('../configs/babel.config')
require('@babel/register')(babelConfigs)

const AIControl = require('../modules/AIControl.ts').default
const {querySeats} = require('../modules/utils')

const envPath = path.resolve(__dirname, '../', `.env.${process.env.NODE_ENV}`)
require('dotenv')
  .config({
    path: envPath
  })

describe('AI control', function() {
  describe(', before game begin.', function() {
    beforeEach(function() {
      //
    })
    after(function() {
      //
    })
    it('should fill the game with AI identical to the remaining seats', function() {
      return AIControl.fillInAI().then(() => {
        AIControl.getAIs().length.should.equal(7)
        AIControl.AIGetout()
      })
    })
    it('should team up AI in size of 2', function() {
      return AIControl.fillInAI().then(() => {
        const AIs = AIControl.getAIs()
        const pairedAmount = AIs.reduce((accumulator, AIInstance, index, array) => {
          const expectedTeammateIndex = index < 3 ? index + 3 : index - 3
          if (
            AIInstance.teammate === array[expectedTeammateIndex].id
          ) {
            return accumulator + 1
          }
          return accumulator
        }, 0)
        pairedAmount.should.equal(6)
        AIs[6].teammate.should.notExist
        AIControl.AIGetout()
      })
    })
  })

  describe(', at round 2.', function() {
    let myPossibilities
    let teammatePossibilities
    it(`
      according to cards its knows(including teammate's card if it in team),
      find out all the remaining cards
      `, function() {
      //
    })
    it(`
      if it's holding card that less than 4,
      and the next card may be a high number card,
      add seed card
      `, function() {
      //
    })
    it(`
      if teammate is holding card that less than 4,
      and the next card may be a high number card,
      add seed card
    `, function() {
      //
    })
    it(`
      In other situation, choose to replace card
    `, function() {
      //
    })
  })

  describe(', at round 4. AI should be able to', function() {
    let playersHaveLeft
    let myTotalCardNumberAtEachCircumstance
    it(`
      know how many players have given up before making decision
    `, function() {
      //
    })
    it(`
      if teammate not given up,
      calculate my possibility of receiving each seed card,
      and my total number at each circumstance
    `, function() {
      //
    })
    it(`
      if teammate not given up,
      calculate my possibility of receiving each seed card,
      and my total number at each circumstance
    `, function() {
      //
    })

    it(`
      all the possibilities should be less or equal to 1,
      and large or equal to 0
    `, function() {
      //
    })
  })
})
