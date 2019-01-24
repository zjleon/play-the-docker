const should = require('should')
const path = require('path')
const babelConfigs = require('../configs/babel.config')
require('@babel/register')(babelConfigs)

const AI = require('../modules/AI.ts').default
const replaceOrAdd = require('../modules/logic/replaceOrAdd.ts').default

const envPath = path.resolve(__dirname, '../', `.env.${process.env.NODE_ENV}`)
require('dotenv')
  .config({
    path: envPath
  })

describe('AI', function() {
  // let robot
  // before(function() {
  //   robot = new AI()
  // })
  // after(function() {
  //   robot.leave()
  // })
  it('should be able to join the game', function() {
    const robot = new AI()
    robot.ready.then(function() {
      setTimeout(() => {
        should(robot.id).be.string
        robot.leave()
        done()
      }, 500)
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
      let cardSet1 = new Array(15).fill(1).map((card, index) => {
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
      const knownCondition1 = {
        publicCards: cardSet1,
        maximamNumber: cardSet1.length,
        myCard: cardSet1[2],
        teammateCard: cardSet1[8],
      }
      replaceOrAdd(knownCondition1).decision.should.equal('addSeedCard')
    })
    it(`
      1. seed card number larger than 12
      2. my teammate's card is lower than 4
    `, function() {
      let cardSet1 = new Array(15).fill(1).map((card, index) => {
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
      const knownCondition1 = {
        publicCards: cardSet1,
        maximamNumber: cardSet1.length,
        myCard: cardSet1[9],
        teammateCard: cardSet1[1],
      }
      replaceOrAdd(knownCondition1).decision.should.equal('addSeedCard')
    })
    it(`
      1. next card may larger than 12
      2. my teammate's card is lower than 4
    `, function() {
      let cardSet1 = new Array(15).fill(1).map((card, index) => {
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
      const knownCondition1 = {
        publicCards: cardSet1,
        maximamNumber: cardSet1.length,
        myCard: cardSet1[9],
        teammateCard: cardSet1[1],
      }
      replaceOrAdd(knownCondition1).decision.should.equal('addSeedCard')
    })
    it(`
      1. next card may larger than 12
      2. my card is lower than 4
    `, function() {
      let cardSet1 = new Array(15).fill(1).map((card, index) => {
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
      const knownCondition1 = {
        publicCards: cardSet1,
        maximamNumber: cardSet1.length,
        myCard: cardSet1[1],
        teammateCard: cardSet1[9],
      }
      replaceOrAdd(knownCondition1).decision.should.equal('addSeedCard')
    })
  })
})
