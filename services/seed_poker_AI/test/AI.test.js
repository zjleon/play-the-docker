const should = require('should')
const path = require('path')
const babelConfigs = require('../configs/babel.config')
require('@babel/register')(babelConfigs)

const AI = require('../modules/AI.ts').default
const replaceOrAdd = require('../modules/logic/replaceOrAdd.ts').default
const drop = require('../modules/logic/drop.ts').default

const envPath = path.resolve(__dirname, '../', `.env.${process.env.NODE_ENV}`)
require('dotenv')
  .config({
    path: envPath
  })

describe('AI', function() {
  it('should be able to join the game', function(done) {
    const robot = new AI()
    robot.ready.then(function() {
      should(robot.id).be.string
      robot.leave()
      done()
    })
      .catch(error => {
        done(error)
      })
  })
  describe('should add seed card, when', function() {
    it(`
      1. seed card number larger than 12
      2. my card is lower than 4
    `, function() {
      let cardSet = new Array(15).fill(1).map((card, index) => {
        let state
        if (index < 7) {
          state = 'inPlayer'
        } else if ( index === 12) {
          state = 'seedCard'
        } else {
          state = 'inStack'
        }
        return {
          id: index,
          number: index + 1,
          state,
        }
      })
      const knownCondition = {
        publicCards: cardSet,
        maximamNumber: cardSet.length,
        myCard: cardSet[2],
        teammateCard: cardSet[6],
      }
      replaceOrAdd(knownCondition).decision.should.equal('addSeedCard')
    })
    it(`
      1. seed card number larger than 12
      2. my teammate's card is lower than 4
    `, function() {
      let cardSet = new Array(15).fill(1).map((card, index) => {
        let state
        if (index < 7) {
          state = 'inPlayer'
        } else if ( index === 12) {
          state = 'seedCard'
        } else {
          state = 'inStack'
        }
        return {
          id: index,
          number: index + 1,
          state,
        }
      })
      const knownCondition = {
        publicCards: cardSet,
        maximamNumber: cardSet.length,
        myCard: cardSet[6],
        teammateCard: cardSet[1],
      }
      replaceOrAdd(knownCondition).decision.should.equal('addSeedCard')
    })
    it(`
      1. next card may larger than 12
      2. my teammate's card is lower than 4
    `, function() {
      let cardSet = new Array(15).fill(1).map((card, index) => {
        let state
        if (index < 7) {
          state = 'inPlayer'
        } else if ( index === 8) {
          state = 'seedCard'
        } else {
          state = 'inStack'
        }
        return {
          id: index,
          number: index + 1,
          state,
        }
      })
      const knownCondition = {
        publicCards: cardSet,
        maximamNumber: cardSet.length,
        myCard: cardSet[5],
        teammateCard: cardSet[1],
      }
      replaceOrAdd(knownCondition).decision.should.equal('addSeedCard')
    })
    it(`
      1. next card may larger than 12
      2. my card is lower than 4
    `, function() {
      let cardSet = new Array(15).fill(1).map((card, index) => {
        let state
        if (index < 7) {
          state = 'inPlayer'
        } else if ( index === 8) {
          state = 'seedCard'
        } else {
          state = 'inStack'
        }
        return {
          id: index,
          number: index + 1,
          state,
        }
      })
      const knownCondition = {
        publicCards: cardSet,
        maximamNumber: cardSet.length,
        myCard: cardSet[1],
        teammateCard: cardSet[9],
      }
      replaceOrAdd(knownCondition).decision.should.equal('addSeedCard')
    })
  })
  describe('in other circumstance, AI should replace its card.', function() {
    it(`
      drop a lower number card if
      the number of card in stack is less than 4,
      and the largest seed card is lower than 4,
      and one of my card is larger than 12
    `, function() {
      //
      let cardSet = new Array(15).fill(1).map((card, index) => {
        let state
        if (index < 3) {
          state = 'seedCard'
        } else if ( index >= 7) {
          state = 'inPlayer'
        } else if (index === 3) {
          state = 'abandomed'
        } else {
          state = 'inStack'
        }
        return {
          id: index,
          number: index + 1,
          state,
        }
      })
      const knownCondition = {
        publicCards: cardSet,
        maximamNumber: cardSet.length,
        myCard: cardSet[14],
        myLowerNumberCard: cardSet[9],
        teammateCard: cardSet[8],
      }

      should.deepEqual(drop(knownCondition).card, knownCondition.myLowerNumberCard)
    })
    // it.only('drop a higher number card in other circumstance', function() {
    //   //
    // })
  })
  describe('AI should be able to calculate the best card combination', function() {
    //
  })
})
