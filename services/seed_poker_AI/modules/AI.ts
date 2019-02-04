import {client, connection} from 'websocket'
import {messageTypes} from '../configs/constants'
import {EventManager} from './utils'
import replaceOrAdd from './logic/replaceOrAdd'
import dropCard from './logic/drop'
import quitOrStay from './logic/quitOrStay'
import {card, record, conditions, decision} from '../configs/declaration'
interface AIInterface {
  id: string
  name: string
  seatNumber: number
  decisions: record[]
  cards: card[]
  hasGivenUp: boolean
}

export default class AI {
  private connection:connection
  public ready: Promise<any>
  private gameRound: number = 1
  public name: string = ''
  public id: string = ''
  private seatNumber: number
  private decisions: record[]
  private hasGivenUp: boolean
  private cards: card[]
  private knownCards: card[]
  public teammate: {
    id: string,
    card?: card,
  }
  public givenUpPlayers: string[] = []
  public winner: string

  constructor() {
    let c = new client()
    let connectionPromise = new Promise((resolve, reject) => {
      c.on('connect', (connection) => {
        this.connection = connection
        connection.on('message', this.distributeMessage.bind(this))
        this.send('JOIN_GAME')
        resolve(this)
      })
      c.on('connectFailed', function(error){
        this.gameRound = -1
        reject(error)
      })
    })
    let jointGamePromise = new Promise((resolve, reject) => {
      const stateCheck = () => {
        if(timer){
          clearTimeout(timer)
        }

        if(this.id) {
          resolve(this)
        } else if(this.gameRound === -1) {
          reject('connection failed')
        } else{
          setTimeout(stateCheck, 50)
        }
      }
      let timer = setTimeout(stateCheck, 50)
    })

    this.ready = Promise.all([connectionPromise, jointGamePromise])
    .then((instance) => instance[0])
    .catch((error) => {
      console.error(error)
    })
    c.connect(process.env.WS_ENDPOINT + '/game')
  }

  private distributeMessage({type, utf8Data}: {type:string, utf8Data: string}) {
    if(type !== 'utf8'){return null}
    const {message, data} : {message: string, data: any} = JSON.parse(utf8Data)
    switch(message) {
      case messageTypes.GAME_ROUND:
        this.gameRound = data
      break
      case messageTypes.PLAYER_STATE:
        this.updateAIState(data)
      break
      case messageTypes.CARDS_STATE:
        this.knownCards = data
      break
      case messageTypes.NEED_TO_MAKE_DECISION:
        this.decide()
      break
      case messageTypes.PLAYER_GIVEN_UP:
        this.givenUpPlayers.push(data)
      break
      case messageTypes.WINNER:
        this.winner = data
      break
      default:
    }
  }

  send(message: any, data?: any): void {
    const payload = {
      message: messageTypes[message],
      data,
    };
    this.connection.send(JSON.stringify(payload))
  }

  leave():void {
    this.connection.close()
    if (this.teammate && this.teammate.id) {
      EventManager.unsubscribe(this.teammate.id + '-card')
    }
  }

  addTeammate(teammateId: string): void {
    this.teammate = {id: teammateId}
    EventManager.subscribe(teammateId + '-card', (card: card) => {
      this.teammate.card = card
    })
  }

  // get new card, drop card will trigger this
  updateAIState(newState: AIInterface){
    Object.assign(this, newState)
    if (this.cards.length === 1) {
      EventManager.publish(this.id + '-card', this.cards[0])
    }
    if (
      this.cards.length === 2 &&
      this.decisions.length === 1 &&
      this.decisions[0].name === messageTypes.REPLACE_CARD
    ) {
      this.decide()
    }
  }

  decide() {
    let lagerNumberCard: card, lowerNumberCard: any
    if(
      this.cards.length === 2
    ) {
      lagerNumberCard = this.cards[0]
      lowerNumberCard = this.cards[1]
    } else {
      lagerNumberCard = this.cards[0]
    }
    let knownConditions: conditions = {
      publicCards: this.knownCards,
      maximamNumber: this.knownCards.length,
      myCard: lagerNumberCard,
      myLowerNumberCard: lowerNumberCard,
      teammateCard: this.teammate && this.teammate.card,
      givenUpPlayers: this.givenUpPlayers,
    }

    let result: decision
    switch(this.gameRound) {
      case 3:
        result = lowerNumberCard ? dropCard(knownConditions) : replaceOrAdd(knownConditions)
        break
      case 4:
        result = quitOrStay(knownConditions)
        break
    }
    this.send(result.decision, result.card ? result.card.id : null)
  }
}
