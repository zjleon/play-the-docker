import { applyMiddleware, compose, createStore } from 'redux'

import createSagaMiddleware from 'redux-saga'
import initialStore from './initialStore'
import rootReducer from './rootReducer'
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
let store = createStore(
  rootReducer,
  initialStore,
  composeEnhancers(applyMiddleware(sagaMiddleware))
)
let sagaTask = sagaMiddleware.run(rootSaga)

if (module.hot) {
  module.hot.accept('./rootReducer.js', (module) => {
    store.replaceReducer(require('./rootReducer.js').default)
  })
  module.hot.accept('./rootSaga.js', (module) => {
    const getNewSagas = require('./rootSaga.js').default
    sagaTask.cancel()
    sagaTask.done.then(() => {
      sagaTask = sagaMiddleware.run(getNewSagas)
    })
  })
}

export default store
