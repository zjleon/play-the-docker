const path = require('path')
const envPath = path.resolve(__dirname, '../', `.env.${process.env.NODE_ENV}`)
require('dotenv')
  .config({
    path: envPath
  })
const sinon = require('sinon')
const should = require('should')
const Dealer = require('../modules/GeneralControl/dealer')
const PlayerControl = require('../modules/EntityControl/player')
const CardControl = require('../modules/EntityControl/card')
const roundInterval = parseInt(process.env.ROUND_INTERVAL, 10)
const maximamPlayer = parseInt(process.env.MAX_PLAYER, 10)

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
      for (let i = 0; i < maximamPlayer; i++) {
        PlayerControl.join()
      }
      Dealer.getCurrentRound().should.equal(2)
      clock.tick(roundInterval)
    })
    it('should start with random player', function() {
      this.retries(3)
      let isRandom = false
      let lastHouse
      for (let i = 0; i < maximamPlayer - 1; i++) {
        if (isRandom) {
          break
        }
        PlayerControl.join()
        const player = PlayerControl.getCurrentPlayer()
        if (
          lastHouse && player.seatNumber !== lastHouse.seatNumber
        ) {
          isRandom = true
        }
        lastHouse = player
      }
      isRandom.should.equal(true)
    })
    it('dealer should have number of card = player number * 2 + 1', function() {
      //
      const dealerCards = CardControl.getDealerCards()
      dealerCards.length.should.equal(maximamPlayer * 2 + 1)
    })
  })
  describe('2,', function() {
    let clock
    beforeEach(function() {
      clock = sinon.useFakeTimers()
      Dealer.resetGame()
      for (let i = 0; i < maximamPlayer; i++) {
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
      playerHoldCards.length.should.equal(maximamPlayer)
    })
    it('there is one seed card', function() {
      const seedCards = CardControl.getSeedCards()
      seedCards.length.should.equal(1)
    })
    it('start countdown at the end of this turn, after countdown, goes into round 3', function() {
      clock.tick(roundInterval)
      Dealer.getCurrentRound().should.equal(3)
    })
  })
  describe('3,', function() {
    describe('all players made choice', function() {
      let clock
      beforeEach(function() {
        clock = sinon.useFakeTimers()
        Dealer.resetGame()
        for (let i = 0; i < maximamPlayer; i++) {
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
        for (let i = 0; i < maximamPlayer; i++) {
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
        for (let i = 0; i < maximamPlayer; i++) {
          PlayerControl.join()
        }
        clock.tick(roundInterval)
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
  describe('4 or 5,', function() {
    let clock
    let players = []
    let seedCards
    before(function() {
      clock = sinon.useFakeTimers()
      Dealer.resetGame()
      for (let i = 0; i < maximamPlayer; i++) {
        players.push(PlayerControl.join())
      }
      clock.tick(roundInterval)

      players.forEach((player) => {
        Dealer.playerAddSeedCard(player.id)
        clock.tick(3000)
      })
      clock.tick(roundInterval)
      seedCards = CardControl.getSeedCards()
    })
    after(function() {
      clock.restore()
      Dealer.resetGame()
      players = []
    })
    it.only(`
      part of the players choose to stay,
      the others choose to give up
    `, function() {
      Dealer.getCurrentRound().should.equal(4)

      players.forEach((player, index) => {
        if (index < 4) {
          Dealer.playerGiveUp(player.id)
        } else {
          Dealer.playerStay(player.id)
        }
      })
      players.forEach((player, index) => {
        const decisions = PlayerControl.getPlayer(player.id).decisions
        if (index < 4) {
          should(decisions.find(decision => decision.name === 'giveUp')).exist
        } else {
          should(decisions.find(decision => decision.name === 'stay')).exist
        }
      })
    })
    it.only(`
      For the remaining players,
      start from the player on the house's right,
      player reveal his card one by one, until the house
    `, function() {
      // check the playerState
      clock.tick(roundInterval)
      Dealer.getCurrentRound().should.equal(5)
      clock.tick(500 * maximamPlayer)

      players.forEach((player, index) => {
        const state = PlayerControl.getPlayer(player.id).cards[0].state
        if (index < 4) {
          state.should.equal('inPlayer')
        } else {
          state.should.equal('inPlayerAndRevealed')
        }
      })
    })
    it.only(`
      the largest seed card goes to the player who holds the smallest card
    `, function() {
      let cardMapping = {}
      const seedCardsString = seedCards.map(card => card.number).join(' ')
      players.forEach((player, index) => {
        const cards = PlayerControl.getPlayer(player.id).cards
        let holdingCorrectCards = false
        if (index < 4) {
          cards.length.should.equal(1)
        } else {
          cards.length.should.equal(2)
          const match1 = new RegExp('\\b' + cards[0].number + '\\b').test(seedCardsString)
          const match2 = new RegExp('\\b' + cards[1].number + '\\b').test(seedCardsString)
          if (
            match1 &&
            !match2
          ) {
            cardMapping[cards[0].number] = cards[1].number
            holdingCorrectCards = true
          }
          if (
            !match1 &&
            match2
          ) {
            cardMapping[cards[1].number] = cards[0].number
            holdingCorrectCards = true
          }
          holdingCorrectCards.should.equal(true)
        }
      })
      should(cardMapping[seedCards[0].number]).below(cardMapping[seedCards[1].number])
      should(cardMapping[seedCards[0].number]).below(cardMapping[seedCards[2].number])
      should(cardMapping[seedCards[1].number]).below(cardMapping[seedCards[2].number])
    })
  })
})
