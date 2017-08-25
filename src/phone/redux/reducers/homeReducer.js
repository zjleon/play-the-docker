// @flow
import {Map} from 'immutable'

const initialState = Map({
  quaternion: [],
})

export default (
  state: Map<*, *> = initialState,
  action: {type: string, quaternion: Array<number>}
) => {
  switch (action.type) {
  case 'CHANGE_QUATERNION':
    return state.set('quaternion', action.quaternion)
  default:
    return state
  }
}
