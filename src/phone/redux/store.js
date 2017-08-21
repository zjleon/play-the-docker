import { applyMiddleware, compose, createStore } from 'redux'

import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import rootSaga from './sagas'
import sagaMoniter from './sagamoniter'

const sagaMiddleware = createSagaMiddleware({sagaMoniter})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
)
sagaMiddleware.run(rootSaga)

if (module.hot) {
  console.log(111)
  module.hot.accept('./reducers/', (module) => {
    console.log(module)
    store.replaceReducer(require('./reducers/index.js').default)
  })
}

export default store
