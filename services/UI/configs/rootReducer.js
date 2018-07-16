import { combineReducers } from 'redux-immutable'
import homeReducer from '../modules/Home/reducer'
import userInfoReducer from '../modules/Common/reducers'

const rootReducer = combineReducers({
  home: homeReducer,
  userInfo: userInfoReducer,
})

export default rootReducer
