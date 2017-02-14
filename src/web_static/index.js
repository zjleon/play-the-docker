import { AppContainer } from 'react-hot-loader'
import Header from './common/header/header.js'
import React from 'react'
import { render } from 'react-dom'

// import { Router, browserHistory, Route, Redirect } from 'react-router'

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
  console.log(module)
  module.hot.accept('./common/header/header.js', () => {
    console.log(Header)
    hotRender(Header)
  })
}
