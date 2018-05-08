import { combineReducers } from 'redux'
import homeReducer from './homeReducer'
import socketReducer from './socketReducer'
import testChangesReducer from './testChangesReducer'

const rootReducer = combineReducers({
  home: homeReducer,
  socket: socketReducer,
  testChanges: testChangesReducer,
})

export default rootReducer
