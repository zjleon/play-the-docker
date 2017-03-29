import { AppContainer } from 'react-hot-loader'
import Header from './common/header/header.js'
import React from 'react'
import { render } from 'react-dom'
// import wsService from './service/WSServices'
let W3CWebSocket = require('websocket').w3cwebsocket
let phoneClient = new W3CWebSocket(process.env.WS_ENDPOINT, 'echo-protocol')
let tvClient = new W3CWebSocket(process.env.WS_ENDPOINT1, 'echo-protocol')

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

tvClient.onopen = function() {
  console.log('WebSocket Client Connected')

  const sendNumber = () => {
    if (tvClient.readyState === tvClient.OPEN) {
      let test = {
        phone: {a: 1},
        tv: {b: 2},
      }
      tvClient.send(JSON.stringify(test))
    }
  }
  sendNumber()
}

tvClient.onmessage = function(e) {
  console.log("tv Received: '" + JSON.stringify(e.data) + "'")
}

tvClient.onerror = function() {
  console.log('Connection Error')
}

tvClient.onclose = function() {
  console.log('echo-protocol Client Closed')
}

phoneClient.onopen = function() {
  console.log('WebSocket Client Connected')

  const sendNumber = () => {
    if (phoneClient.readyState === phoneClient.OPEN) {
      let test = {
        phone: {a: 3},
        tv: {b: 4},
      }
      phoneClient.send(JSON.stringify(test))
    }
  }
  sendNumber()
}

phoneClient.onmessage = function(e) {
  console.log("phone Received: '" + JSON.stringify(e.data) + "'")
}

phoneClient.onerror = function() {
  console.log('Connection Error')
}

phoneClient.onclose = function() {
  console.log('echo-protocol Client Closed')
}
