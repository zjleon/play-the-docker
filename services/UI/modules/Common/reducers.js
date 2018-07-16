import {CLEAR_ALL_USER_INFO, UPDATE_USER_INFO} from './actions'

export default function authenticateReducer(state, action) {
  switch (action.type) {
  case UPDATE_USER_INFO:
    return state.merge(action.updateObject)
  case CLEAR_ALL_USER_INFO:
    return state.clear()
  default:
    return state
  }
}
