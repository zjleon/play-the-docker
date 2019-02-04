import { typeToMessage } from '../../configs/constants'
import EventManager from './eventManager'

EventManager.subscribe(typeToMessage.PLAYERS_STATE, function(players) {
  // console.info(`players update: ${JSON.stringify(players)}`)
})

EventManager.subscribe(typeToMessage.PLAYER_STATE, function(player) {
  // console.info(`player ${player.id} updated: ${JSON.stringify(player)}`)
})
