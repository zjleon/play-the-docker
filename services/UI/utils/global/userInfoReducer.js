import {CLEAR_ALL, UPDATE_USER_INFO} from '../../configs/actionTypes'

export default function authenticateReducer(state, action) {
  switch (action.type) {
  case UPDATE_USER_INFO:
    return state.merge(action.updateObject)
  case CLEAR_ALL:
    return state.clear()
  default:
    return state
  }
}
