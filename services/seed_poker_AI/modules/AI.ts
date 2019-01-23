import {client, connection} from 'websocket'
import {messageTypes} from '../configs/constants'
// import {EventManager} from './utils'

export default class AI {
  private connection:connection
  public ready: Promise<any>
  private gameRound: number = 1
  public name: string = ''
  public id: string = ''
  private seatNumber: number
  private decisions: object[]
  private cards: object[]
  public teammate: string = ''

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
    const {message, data} = JSON.parse(utf8Data)
    switch(message) {
      case messageTypes.PLAYER_STATE:
        Object.assign(this, data)
      break
      case messageTypes.GAME_ROUND:
        this.gameRound = data
      break
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
  }

  addTeammate(playerId: string): void {
    this.teammate = playerId
  }

  showCard(playerId: string) {
    if(playerId !== this.teammate) {
      return null
    }
    return this.cards
  }
}
