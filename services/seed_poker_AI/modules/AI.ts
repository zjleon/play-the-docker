import {client, connection} from 'websocket'
import {messageTypes} from '../configs/constants'
import { promises } from 'fs';
// import {EventManager} from './utils'
interface robotInfo {
  name: string
  Id: string
  seatNumber: number
  decisions: object[]
}

export default class AI {
  private connection:connection
  public ready: Promise<any>
  public info: robotInfo

  constructor() {
    const c = new client()
    this.ready = new Promise((resolve, reject) => {
      c.on('connect', (connection) => {
        this.connection = connection
        connection.on('message', this.distributeMessage.bind(this))
        this.send('JOIN_GAME')
        resolve(this)
      })
      c.on('connectFailed', function(error){
        reject(error)
      })
    })
    c.connect(process.env.WS_ENDPOINT + '/game')
  }

  distributeMessage({type, utf8Data}: {type:string, utf8Data: string}) {
    if(type !== 'utf8'){return null}
    const {message, data} = JSON.parse(utf8Data)
    switch(message) {
      case messageTypes.PLAYER_STATE:
        this.info = data
      break
    }
  }

  send(message: any, data?: any) {
    const payload = {
      message: messageTypes[message],
      data,
    };
    this.connection.send(JSON.stringify(payload))
  }
}
