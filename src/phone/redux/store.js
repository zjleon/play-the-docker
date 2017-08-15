import { applyMiddleware, createStore } from 'redux'

import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import rootSaga from './sagas'
import sagaMoniter from './sagamoniter'

const sagaMiddleware = createSagaMiddleware({sagaMoniter})
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)

export default store
