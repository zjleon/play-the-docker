const sinon = require('sinon')
const should = require('should')
const Dealer = require('../modules/GeneralControl/dealer')
const PlayerControl = require('../modules/EntityControl/player')
const CardControl = require('../modules/EntityControl/card')

describe('When game in round', function() {
  describe('1,', function() {
    let clock
    beforeEach(function() {
      clock = sinon.useFakeTimers()
      Dealer.resetGame()
    })
    afterEach(function() {
      clock.restore()
      Dealer.resetGame()
    })
    it('should go to round 2 if seat is full', function() {
      for (let i = 0; i < PlayerControl.maximamPlayer; i++) {
        PlayerControl.join()
      }
      Dealer.getCurrentRound().should.equal(2)
      clock.tick(10000)
    })
    it('should start countdown when first player joint and go to round 2 if countdown finished', function() {
      //
    })
    it('should start with random player', function() {
      let isRandom = false
      let lastHouse
      for (let i = 0; i < PlayerControl.maximamPlayer - 1; i++) {
        if (isRandom) {
          break
        }
        PlayerControl.join()
        const player = PlayerControl.getCurrentPlayer()
        if (lastHouse && player.seatNumber !== lastHouse.seatNumber) {
          isRandom = true
        }
        lastHouse = player
      }
      isRandom.should.equal(true)
    })
    it('dealer should have number of card = player number * 2 + 1', function() {
      //
      const dealerCards = CardControl.getDealerCards()
      dealerCards.length.should.equal(PlayerControl.maximamPlayer * 2 + 1)
    })
  })
  describe('2,', function() {
    let clock
    beforeEach(function() {
      clock = sinon.useFakeTimers()
      Dealer.resetGame()
      for (let i = 0; i < PlayerControl.maximamPlayer; i++) {
        PlayerControl.join()
      }
    })
    afterEach(function() {
      clock.restore()
      Dealer.resetGame()
    })
    it('each player should have exactly one card', function() {
      const players = PlayerControl.getPlayers()
      const playerWhoDontHaveCard = Object.keys(players).find(playerID => {
        return players[playerID].cards && players[playerID].cards.length !== 1
      })
      should(playerWhoDontHaveCard).not.exist
      const playerHoldCards = CardControl.getCards().filter(card => card.state === 'inPlayer')
      playerHoldCards.length.should.equal(PlayerControl.maximamPlayer)
    })
    it('there is one seed card', function() {
      const seedCards = CardControl.getSeedCards()
      seedCards.length.should.equal(1)
    })
    it('start countdown at the end of this turn, after countdown, goes into round 3', function() {
      clock.tick(10000)
      Dealer.getCurrentRound().should.equal(3)
    })
  })
  describe('3,', function() {
    // it('dealer ask each player make decision', function() {
    //   clock.tick(10000)
    // })
    describe('all players made choice', function() {
      let clock
      beforeEach(function() {
        clock = sinon.useFakeTimers()
        Dealer.resetGame()
        for (let i = 0; i < PlayerControl.maximamPlayer; i++) {
          PlayerControl.join()
        }
        clock.tick(10001)
      })
      afterEach(function() {
        clock.restore()
        Dealer.resetGame()
      })
      it('game should move to round 4', function() {
        for (let i = 0; i < 7; i++) {
          Dealer.playerAddSeedCard()
        }
        Dealer.getCurrentRound().should.equal(4)
      })
      it('there should be no card in stack', function() {
        for (let i = 0; i < 7; i++) {
          Dealer.playerAddSeedCard()
        }
        const cardInStack = CardControl.getCards().find(card => card.state === 'inStack')
        should(cardInStack).not.exist
      })
    })
    describe('player chose to replace his card,', function() {
      let clock
      beforeEach(function() {
        clock = sinon.useFakeTimers()
        Dealer.resetGame()
        for (let i = 0; i < PlayerControl.maximamPlayer; i++) {
          PlayerControl.join()
        }
        clock.tick(10001)
      })
      afterEach(function() {
        clock.restore()
        Dealer.resetGame()
      })
      it('should get a new card, and have related record', function() {
        Dealer.playerReplaceCard()
        const currentPlayer = PlayerControl.getCurrentPlayer()
        currentPlayer.cards.length.should.equal(2)
        currentPlayer.decisions.length.should.equal(1)
      })
      it('player should not act until last player decide which card to drop', function() {
        const lastPlayer = PlayerControl.getCurrentPlayer()
        Dealer.playerReplaceCard(lastPlayer.id)
        let currentPlayer = PlayerControl.getCurrentPlayer()
        lastPlayer.id.should.equal(currentPlayer.id)

        const cardToDrop = currentPlayer.cards[1]
        Dealer.playerReplaceCard(currentPlayer.id, cardToDrop.id)
        currentPlayer = PlayerControl.getCurrentPlayer()
        should.notEqual(lastPlayer.id, currentPlayer.id)
      })
      it('should see the dropped card goes into abandom zone', function() {
        const lastPlayer = PlayerControl.getCurrentPlayer()
        Dealer.playerReplaceCard(lastPlayer.id)
        let currentPlayer = PlayerControl.getCurrentPlayer()

        const cardToDrop = currentPlayer.cards[1]
        Dealer.playerReplaceCard(currentPlayer.id, cardToDrop.id)
        const droppedCards = CardControl.getAbandomCards()
        const isCardDropped = droppedCards.find(card => card.id === cardToDrop.id)
        isCardDropped.should.be.Object()
      })
    })
    describe('player chose to add seed card,', function() {
      let clock
      beforeEach(function() {
        clock = sinon.useFakeTimers()
        Dealer.resetGame()
        for (let i = 0; i < PlayerControl.maximamPlayer; i++) {
          PlayerControl.join()
        }
        clock.tick(10001)
      })
      afterEach(function() {
        clock.restore()
        Dealer.resetGame()
      })
      it('player should have record, and game move to next player', function() {
        const lastPlayer = PlayerControl.getCurrentPlayer()
        Dealer.playerAddSeedCard(lastPlayer.id)
        const players = PlayerControl.getPlayers()
        should(Object.keys(players).find(playerId => players[playerId].decisions && players[playerId].decisions.length)).be.String()
        let currentPlayer = PlayerControl.getCurrentPlayer()
      })
      it('if there less than 3 seed cards, should see new seed card in seed card zone', function() {
        const lastPlayer = PlayerControl.getCurrentPlayer()
        Dealer.playerAddSeedCard(lastPlayer.id)
        CardControl.getSeedCards().length.should.equal(2)
      })
      it('if there already 3 seed cards, lowest number card goes to abandom zone', function() {
        let lastPlayer
        for (let i = 0; i < 3; i++) {
          lastPlayer = PlayerControl.getCurrentPlayer()
          Dealer.playerAddSeedCard(lastPlayer.id)
        }
        CardControl.getSeedCards().length.should.equal(3)
        CardControl.getAbandomCards().length.should.equal(1)
      })
    })
  })
})
