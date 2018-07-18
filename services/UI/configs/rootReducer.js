import authenticationReducer from '../modules/Authentication/reducer'
import { combineReducers } from 'redux-immutable'
import globalUIReducer from '../modules/GlobalUI/reducers'
import homeReducer from '../modules/Home/reducer'

const rootReducer = combineReducers({
  home: homeReducer,
  globalUI: globalUIReducer,
  authentication: authenticationReducer,
})

export default rootReducer
