// import {Map, is} from 'immutable'

import {
  CONNECT_WS,
} from './action'
import {messageTypes} from '../../configs/constants'

export default (
  state,
  action
) => {
  let newState
  switch (action.type) {
  case messageTypes.PLAYERS_STATE:
    newState = state.set('players', action.value)
    return newState
  case messageTypes.GAME_ROUND:
    newState = state.set('round', action.value)
    return newState
  case messageTypes.CARDS_STATE:
    newState = state.set('cards', action.value)
    return newState
  default:
    return state
  }
}
