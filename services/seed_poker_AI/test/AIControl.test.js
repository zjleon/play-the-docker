const should = require('should')
const path = require('path')
const babelConfigs = require('../configs/babel.config')
require('@babel/register')({
  ...babelConfigs,
  extensions: [".es6", ".es", ".jsx", ".js", ".ts"],
})

const AI = require('../modules/AI.ts').default

const envPath = path.resolve(__dirname, '../', `.env.${process.env.NODE_ENV}`)
require('dotenv')
  .config({
    path: envPath
  })

describe('AI control', function() {
  before(function() {
    //
  })
  after(function() {
    //
  })
  describe(', before game begin.', function() {
    it('should fill the game with AI identical to the remaining seats', function(done) {
      //
    })
    it('should team up AI in size of 2', function() {
      //
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
