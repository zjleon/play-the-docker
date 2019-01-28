const should = require('should')
const path = require('path')
// const sinon = require('sinon')
const babelConfigs = require('../configs/babel.config')
require('@babel/register')(babelConfigs)

const AIControl = require('../modules/AIControl.ts').default

const envPath = path.resolve(__dirname, '../', `.env.${process.env.NODE_ENV}`)
require('dotenv')
  .config({
    path: envPath
  })

describe('AI control', function() {
  describe(', before game begin.', function() {
    let AIManager
    beforeEach(function() {
      AIManager = new AIControl()
    })
    afterEach(function() {
      AIManager = null
    })
    it('should fill the game with AI identical to the remaining seats', function() {
      return AIManager.fillInAI().then(() => {
        AIManager.getAIs().length.should.equal(7)
        AIManager.AIGetout()
      })
    })
    it('should team up AI in size of 2', function() {
      return AIManager.fillInAI().then(() => {
        const AIs = AIManager.getAIs()
        const pairedAmount = AIs.reduce((accumulator, AIInstance, index, array) => {
          const expectedTeammateIndex = index < 3 ? index + 3 : index - 3
          if (
            AIInstance.teammate &&
            AIInstance.teammate.id === array[expectedTeammateIndex].id
          ) {
            return accumulator + 1
          }
          return accumulator
        }, 0)
        pairedAmount.should.equal(6)
        should(AIs[6].teammate).notExist
        AIManager.AIGetout()
      })
    })
  })
  describe(', at round 2.', function() {
    let AIManager
    beforeEach(function() {
      AIManager = new AIControl()
    })
    afterEach(function() {
      AIManager = null
    })
    it('Each AI should have 1 card in hand', function(done) {
      AIManager.fillInAI().then(() => {
        setTimeout(() => {
          AIManager.getAIs().forEach(AI => {
            AI.gameRound.should.equal(2)
            AI.cards.length.should.equal(1)
          })
          AIManager.AIGetout()
          done()
        }, 500)
      })
    })
  })
  describe(', at round 3.', function() {
    let AIManager
    let clock
    this.timeout(60000)
    beforeEach(function() {
      AIManager = new AIControl()
      // clock = sinon.useFakeTimers()
    })
    afterEach(function() {
      AIManager = null
      // clock.restore()
    })
    it('One AI should have made decision', function(done) {
      AIManager.fillInAI().then(() => {
        setTimeout(() => {
          AIManager.getAIs().forEach(AI => {
            AI.gameRound.should.equal(3)
            AI.decisions.length.should.aboveOrEqual(1)
          })
          AIManager.AIGetout()
          done()
        }, 35000)
      })
    })
  })
})
