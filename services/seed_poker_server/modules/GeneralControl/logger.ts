import { typeToMessage } from '../../configs/constants'
import EventManager from './eventManager'

EventManager.subscribe(typeToMessage.PLAYERS_STATE, function(players) {
  console.info(`players update: ${players}`)
})

EventManager.subscribe(typeToMessage.PLAYERS_STATE, function(player) {
  console.info(`player ${player.id} updated: ${player}`)
})
