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

const roundInterval = parseInt(process.env.ROUND_INTERVAL, 10)
const actionInterval = parseInt(process.env.ACTION_INTERVAL, 10)
const maximamPlayer = parseInt(process.env.MAX_PLAYER, 10)

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
    this.timeout(60000)
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
        }, roundInterval + 100)
      })
    })
  })
  describe(', at round 3.', function() {
    let AIManager
    this.timeout(60000)
    beforeEach(function() {
      AIManager = new AIControl()
    })
    afterEach(function() {
      AIManager = null
    })
    it('AIs should have decided add seed card or replace card', function(done) {
      AIManager.fillInAI().then(() => {
        setTimeout(() => {
          AIManager.getAIs().forEach(AI => {
            const decisions = AI.decisions
            AI.gameRound.should.equal(3)
            if (decisions[0].name === 'addSeedCard') {
              decisions.length.should.equal(1)
              return
            }
            if (decisions[0].name === 'replaceCard') {
              decisions.length.should.equal(2)
              decisions[1].name.should.equal('dropCard')
              return
            }
            throw new Error('unknown circumstance')
          })
          AIManager.AIGetout()
          done()
        }, roundInterval * 2 + actionInterval * maximamPlayer + 100)
      })
    })
  })
  describe('the winner', function() {
    let AIManager
    this.timeout(180000)
    beforeEach(function() {
      AIManager = new AIControl()
    })
    afterEach(function() {
      AIManager = null
    })
    //
    it.only(`
      should have the same id, card number with one of the AI,
      other AIs should have smaller card
    `, function(done) {
      AIManager.fillInAI().then(() => {
        setTimeout(() => {
          let winnerExist = false
          AIManager.getAIs().forEach(AIInstance => {
            should(AIInstance.winner).have.keys('playerId', 'number', 'distanceFromHouse')
            const totalNumber = AIInstance.cards.reduce((accumulator, card) => accumulator + card.number, 0)
            if (AIInstance.winner.playerId === AIInstance.id) {
              AIInstance.winner.number.should.equal(totalNumber)
              winnerExist = true
            } else {
              AIInstance.winner.number.should.aboveOrEqual(totalNumber)
            }
          })
          winnerExist.should.equal(true)
          AIManager.AIGetout()
          done()
        }, roundInterval * 6 + actionInterval * maximamPlayer)
      })
        .catch(error => {
          done(error)
        })
    })
  })
})
