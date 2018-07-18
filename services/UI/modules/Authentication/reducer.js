import {UPDATE_USER_INFO} from './actions'

export default (
  state,
  action
) => {
  switch (action.type) {
  case UPDATE_USER_INFO:
    return action.newInfo ? state.merge(action.newInfo) : state.clear()
  default:
    return state
  }
}
