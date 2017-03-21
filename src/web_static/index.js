import { AppContainer } from 'react-hot-loader'
import Header from './common/header/header.js'
import React from 'react'
import { render } from 'react-dom'
const WebSocketClient = require('websocket').client

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

let W3CWebSocket = require('websocket').w3cwebsocket

let client = new W3CWebSocket('ws://localhost:8070/', 'echo-protocol')

client.onerror = function() {
  console.log('Connection Error')
}

client.onopen = function() {
  console.log('WebSocket Client Connected')

  const sendNumber = () => {
    if (client.readyState === client.OPEN) {
      let number = Math.round(Math.random() * 0xFFFFFF)
      client.send(number.toString())
      console.log(number.toString())
      setTimeout(sendNumber, 1000)
    }
  }
  sendNumber()
}

client.onclose = function() {
  console.log('echo-protocol Client Closed')
}

client.onmessage = function(e) {
  if (typeof e.data === 'string') {
    console.log("Received: '" + e.data + "'")
  }
}
