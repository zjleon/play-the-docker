import { combineReducers } from 'redux'
import homeReducer from './homeReducer'
import socketReducer from './socketReducer'

const rootReducer = combineReducers({
  home: homeReducer,
  socket: socketReducer,
})

export default rootReducer
