import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import React from 'react'
import RootRouter from './modules/Routers'
// import injectTapEventPlugin from 'react-tap-event-plugin'
import { render } from 'react-dom'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
// injectTapEventPlugin()

const hotRender = (NextRouter) => {
  render(
    <AppContainer>
      <NextRouter/>
    </AppContainer>,
    document.getElementById('appContainer')
  )
}

hotRender()

console.log('product check: ', module.hot)

if (module.hot) {
  module.hot.accept('./RootRouter.js', () => {
    const nextRouter = require('./RootRouter.js').default
    hotRender(nextRouter)
  })
}
