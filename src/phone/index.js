import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import React from 'react'
import Router from './common/Router'
// import wsService from './service/WSServices'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { render } from 'react-dom'
import store from './redux/store'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

const hotRender = () => {
  render(
    <Provider store={store}>
      <AppContainer>
        <Router/>
      </AppContainer>
    </Provider>,
    document.getElementById('appContainer')
  )
}

hotRender()

if (module.hot) {
  module.hot.accept('./common/Router.js', () => {
    hotRender()
  })
}
