import {Map} from 'immutable'

// TODO: apply FLOW
const initialState = Map({
  connection: 'closed',
})

export default (state = initialState, action) => {
  switch (action.type) {
  case 'SOCKET_OPEN':
    return state.set('connection', 'open')
  case 'SOCKET_CLOSED':
    return state.set('connection', 'closed')
  default:
    return state
  }
}
