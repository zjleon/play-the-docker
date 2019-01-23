const should = require('should')
const path = require('path')
const babelConfigs = require('../configs/babel.config')
require('@babel/register')(babelConfigs)

const AI = require('../modules/AI.ts').default

const envPath = path.resolve(__dirname, '../', `.env.${process.env.NODE_ENV}`)
require('dotenv')
  .config({
    path: envPath
  })

describe('AI', function() {
  let robot
  before(function() {
    robot = new AI()
  })
  after(function() {
    robot.leave()
  })
  it('should be able to join the game', function() {
    robot.ready.then(function() {
      setTimeout(() => {
        should(robot.id).be.string
        done()
      }, 500)
    })
      .catch(error => {
        done(error)
      })
  })
  it('can show its card to teammate', function() {
  })
  it('can\'t show card to AI who is not its teammate', function() {
  })
})
