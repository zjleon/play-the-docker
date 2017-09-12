import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import React from 'react'
import RootRouter from './common/RootRouter'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { render } from 'react-dom'

injectTapEventPlugin()

const hotRender = (NextRouter) => {
  render(
    <AppContainer>
      <NextRouter/>
    </AppContainer>,
    document.getElementById('appContainer')
  )
}

hotRender(RootRouter)

if (module.hot) {
  module.hot.accept('./common/RootRouter.js', () => {
    const nextRouter = require('./common/RootRouter.js').default
    hotRender(nextRouter)
  })
}
