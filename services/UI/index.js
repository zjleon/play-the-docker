import { Provider } from 'react-redux'
import React from 'react'
import RootRouter from './modules/Routers'
import {
  Router,
} from 'react-router'
import history from './utils/history'
// import injectTapEventPlugin from 'react-tap-event-plugin'
import { render } from 'react-dom'
import store from './configs/store'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
// injectTapEventPlugin()

render(
  <Provider store={store}>
    <Router history={history}>
      <RootRouter />
    </Router>
  </Provider>,
  document.getElementById('appContainer')
)
// const hotRender = (NextRouter) => {
//   render(
//     <AppContainer>
//       <NextRouter/>
//     </AppContainer>,
//     document.getElementById('appContainer')
//   )
// }
//
// hotRender()

// console.log('product check: ', module.hot)


// if (module.hot) {
//   module.hot.accept('./modules/RootRouter/index.js', () => {
//     const nextRouter = require('./modules/RootRouter/index.js').default
//     hotRender(nextRouter)
//   })
// }
