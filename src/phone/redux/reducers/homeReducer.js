import {Map} from 'immutable'

const initialState = Map({
  quaternion: null,
  test1: 1,
})

export default (state = initialState, action) => {
  switch (action.type) {
  case 'CHANGE_QUATERNION':
    return state.set('quaternion', action.quaternion)
  default:
    return state
  }
}
