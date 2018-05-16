// import {Map, is} from 'immutable'

import {
  REQUEST_SAMPLE,
} from '../../configs/actionTypes'

export default (
  state,
  action
) => {
  switch (action.type) {
  case REQUEST_SAMPLE.SUCESS:
    // let newState = state.set('quaternion', action.quaternion)
    console.log('1121', action)
    return state
  default:
    return state
  }
}
