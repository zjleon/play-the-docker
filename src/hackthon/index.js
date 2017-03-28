import { AppContainer } from 'react-hot-loader'
import Header from './common/header/header.js'
import React from 'react'
import { render } from 'react-dom'

const hotRender = (Component) => {
  render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('appContainer')
  )
}

hotRender(Header)

if (module.hot) {
  module.hot.accept('./common/header/header.js', () => {
    console.log(Header)
    hotRender(Header)
  })
}
