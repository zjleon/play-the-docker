// import {Map, is} from 'immutable'

import {
  CONNECT_WS,
} from './action'

export default (
  state,
  action
) => {
  switch (action.type) {
  case CONNECT_WS.SUCESS:
    // let newState = state.set('quaternion', action.quaternion)
    console.log('1121', action)
    return state
  default:
    return state
  }
}
