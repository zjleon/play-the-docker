import {Map} from 'immutable'

const initialState = Map({
  quaternion: null,
})

export default (state = initialState, action) => {
  switch (action.type) {
  case 'CHANGE_QUATERNION':
    return state.set('quaternion', action.quaternion)
  default:
    return state
  }
}
