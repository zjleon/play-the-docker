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

describe('AI', function() {
  let robot
  before(function() {
    robot = new AI()
  })
  after(function() {
    //
  })
  it.only('should be able to join the game', function() {
    robot.ready.then(function() {
      setTimeout(() => {
        should(robot.info).be.object
        should(robot.info.id).be.string
        done()
      }, 500)
    })
      .catch(error => {
        done(error)
      })
  })
})
