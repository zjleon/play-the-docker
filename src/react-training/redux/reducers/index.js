import { combineReducers } from 'redux'
import homeReducer from './homeReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
  user: userReducer,
  home: homeReducer,
})

export default rootReducer
