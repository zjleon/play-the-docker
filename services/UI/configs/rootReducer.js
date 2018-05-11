import { combineReducers } from 'redux'
import homeReducer from '../modules/Home/reducer'

const rootReducer = combineReducers({
  home: homeReducer,
})

export default rootReducer
