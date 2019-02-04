const path = require('path')
const envPath = path.resolve(__dirname, '../', `.env.${process.env.NODE_ENV}`)
require('dotenv')
  .config({
    path: envPath
  })
const should = require('should')
const babelConfigs = require('../configs/babel.config')
require('@babel/register')(babelConfigs)

const AI = require('../modules/AI.ts').default
const replaceOrAdd = require('../modules/logic/replaceOrAdd.ts').default
const drop = require('../modules/logic/drop.ts').default
const quitOrStay = require('../modules/logic/quitOrStay.ts').default

// const roundInterval = parseInt(process.env.ROUND_INTERVAL, 10)
// const actionInterval = parseInt(process.env.ACTION_INTERVAL, 10)
// const maximamPlayer = parseInt(process.env.MAX_PLAYER, 10)

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
      replaceOrAdd(knownCondition).decision.should.equal('ADD_SEED_CARD')
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
      replaceOrAdd(knownCondition).decision.should.equal('ADD_SEED_CARD')
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
      replaceOrAdd(knownCondition).decision.should.equal('ADD_SEED_CARD')
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
      replaceOrAdd(knownCondition).decision.should.equal('ADD_SEED_CARD')
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
  describe('AI at round 4, should', function() {
    //
    it(`
      know who has given up
    `, function() {
      //
    })
    it(`
      decide to stay if it have the largest number after distributing seed cards
    `, function() {
      //
      let cardSet = new Array(15).fill(1).map((card, index) => {
        let state
        if (index < 7) {
          state = 'inPlayer'
        } else if ( index === 14) {
          state = 'seedCard'
        } else {
          state = 'abandomed'
        }
        return {
          id: index,
          number: index + 1,
          state,
        }
      })
      let knownCondition = {
        publicCards: cardSet,
        maximamNumber: cardSet.length,
        myCard: cardSet[0],
        teammateCard: cardSet[1],
      }
      quitOrStay(knownCondition).decision.should.equal('STAY')

      cardSet = new Array(15).fill(1).map((card, index) => {
        let state
        if (index > 7) {
          state = 'inPlayer'
        } else if ( index === 0) {
          state = 'seedCard'
        } else {
          state = 'abandomed'
        }
        return {
          id: index,
          number: index + 1,
          state,
        }
      })
      knownCondition = {
        publicCards: cardSet,
        maximamNumber: cardSet.length,
        myCard: cardSet[14],
        teammateCard: cardSet[13],
      }
      quitOrStay(knownCondition).decision.should.equal('STAY')
    })
  })
})
