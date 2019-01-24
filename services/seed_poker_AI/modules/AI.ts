import {client, connection} from 'websocket'
import {messageTypes} from '../configs/constants'
import {EventManager} from './utils'
import replaceOrAdd from './logic/replaceOrAdd'

interface card {
  id: string,
  number: number,
  state: string,
}
interface AIInterface {
  id: string
  name: string
  seatNumber: number
  decisions: object[]
  cards: card[]
}

export default class AI {
  private connection:connection
  public ready: Promise<any>
  private gameRound: number = 1
  public name: string = ''
  public id: string = ''
  private seatNumber: number
  private decisions: object[]
  private cards: card[]
  private knownCards: card[]
  public teammate: {
    id: string,
    card: card,
  }

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
          setTimeout(stateCheck, 100)
        }
      }
      let timer = setTimeout(stateCheck, 100)
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
      case messageTypes.PLAYER_STATE:
        Object.assign(this, data)
      break
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
    if (this.teammate.id) {
      EventManager.unsubscribe(this.teammate.id + '-card')
    }
  }

  addTeammate(playerId: string): void {
    this.teammate.id = playerId
    EventManager.subscribe(playerId + '-card', (card: card) => {
      this.teammate.card = card
    })
  }

  // get new card, drop card will trigger this
  updateAIState(newState: AIInterface){
    Object.assign(this, newState)
    if (this.cards.length === 1) {
      EventManager.publish(this.id + '-card', this.cards[0])
    }
  }

  decide() {
    let knownConditions = {
      publicCards: this.knownCards,
      maximamNumber: this.knownCards.length,
      myCard: this.cards[0],
      teammateCard: this.teammate.card,
    }

    switch(this.gameRound) {
      case 3:
        const {decision} = replaceOrAdd(knownConditions)
        this.send(decision)
    }
  }

  // dropCard(cardId: string):void {
  //   const cardIndex = this.cards.findIndex((card) => {
  //     return card.id === cardId
  //   })
  //   console.log('dropCard', cardIndex);
  //   this.cards.splice(cardIndex, 1)
  //   EventManager.publish(this.id + '-getCard', this.cards[0])
  // }


}
