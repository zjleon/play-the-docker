import { applyMiddleware, compose, createStore } from 'redux'

import createSagaMiddleware from 'redux-saga'
import initialStore from './initialStore'
import rootReducer from './reducers'
import rootSaga from './sagas'

// import sagaMoniter from './sagamoniter'
const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  rootReducer,
  initialStore,
  composeEnhancers(applyMiddleware(sagaMiddleware))
)
let sagaTask = sagaMiddleware.run(rootSaga)

if (module.hot) {
  module.hot.accept('./reducers/', (module) => {
    store.replaceReducer(require('./reducers/index.js').default)
  })
  module.hot.accept('./sagas/', (module) => {
    const getNewSagas = require('./sagas/').default
    sagaTask.cancel()
    sagaTask.done.then(() => {
      sagaTask = sagaMiddleware.run(getNewSagas)
    })
  })
}

export default store
