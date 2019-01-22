const should = require('should')
const PlayerControl = require('../modules/EntityControl/player')

describe('Players', function() {
  beforeEach(function() {
    PlayerControl.clear()
  })
  afterEach(function() {
    PlayerControl.clear()
  })

  it('can join or leave the game', function() {
    const player = PlayerControl.join()
    let players = PlayerControl.getPlayers()
    players.should.have.lengthOf(1)
    PlayerControl.leave(player.id)
    players = PlayerControl.getPlayers()
    players.should.have.lengthOf(0)
  })
  it('new joint player should have the lowest seat number', function() {
    let newPlayer = PlayerControl.join()
    let newPlayer2 = PlayerControl.join()
    let players = PlayerControl.getPlayers()
    players[newPlayer.id].should.have.property('seatNumber', 1)
    PlayerControl.leave(newPlayer.id)
    newPlayer = PlayerControl.join()
    players = PlayerControl.getPlayers()
    players[newPlayer.id].should.have.property('seatNumber', 1)
  })
})

describe('Player service should', function() {
  beforeEach(function() {
    PlayerControl.clear()
  })
  afterEach(function() {
    PlayerControl.clear()
  })

  it('be able to give the number of remaining seats', function() {
    PlayerControl.join()
    let seats = PlayerControl.getRemaingSeats()
    seats.should.have.lengthOf(6)
  })
})
