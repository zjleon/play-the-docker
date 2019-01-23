import { typeToMessage } from '../../configs/constants'
import EventManager from './eventManager'

EventManager.subscribe(typeToMessage.PLAYERS_STATE, function(players) {
  console.info('players update:', players)
})
