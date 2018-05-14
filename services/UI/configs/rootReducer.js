import { combineReducers } from 'redux-immutable'
import homeReducer from '../modules/Home/reducer'

const rootReducer = combineReducers({
  home: homeReducer,
})

export default rootReducer
