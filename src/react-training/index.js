import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import React from 'react'
import Router from './common/Router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { render } from 'react-dom'
import store from './redux/store'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

const hotRender = (NextRouter) => {
  render(
    <Provider store={store}>
      <AppContainer>
        <NextRouter/>
      </AppContainer>
    </Provider>,
    document.getElementById('appContainer')
  )
}

hotRender(Router)

if (module.hot) {
  module.hot.accept('./common/Router.js', () => {
    const nextRouter = require('./common/Router.js').default
    hotRender(nextRouter)
  })
}
