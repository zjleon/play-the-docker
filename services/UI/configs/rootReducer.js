import { combineReducers } from 'redux-immutable'
import homeReducer from '../modules/Home/reducer'
import userInfoReducer from '../utils/global/userInfoReducer'

const rootReducer = combineReducers({
  home: homeReducer,
  userInfo: userInfoReducer,
})

export default rootReducer
