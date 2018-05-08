// @flow
import {Map, is} from 'immutable'

import initialStore from '../initialStore'

export default (
  state: Map<*, *> = initialStore.home,
  action: {type: string, quaternion: Array<number>}
) => {
  switch (action.type) {
  case 'CHANGE_QUATERNION':
    let newState = state.set('quaternion', action.quaternion)
    console.log('CHANGE_QUATERNION', is(newState, state))
    return newState
  default:
    return state
  }
}
