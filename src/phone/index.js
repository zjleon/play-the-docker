import { AppContainer } from 'react-hot-loader'
import React from 'react'
import Router from './common/Router'
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

hotRender(Router)

if (module.hot) {
  module.hot.accept('./common/header/header.js', () => {
    hotRender(Router)
  })
}

// tvClient.onopen = function() {
//   console.log('WebSocket Client Connected')
//
//   const sendNumber = () => {
//     if (tvClient.readyState === tvClient.OPEN) {
//       let test = {
//         phone: {
//           action: 'initializeDirection',
//           movements: {
//             towardNorth: true,
//             towardEast: true,
//             movement: 10,
//           }
//         },
//         tv: {b: 2},
//       }
//       tvClient.send(JSON.stringify(test))
//     }
//   }
//   sendNumber()
// }
//
tvClient.onmessage = function(e) {
  console.log("tv Received: '" + JSON.stringify(e.data) + "'")
}
//
// tvClient.onerror = function() {
//   console.log('Connection Error')
// }
//
// tvClient.onclose = function() {
//   console.log('echo-protocol Client Closed')
// }

// let initialized = false
// phoneClient.onopen = function() {
//   const sendNumber = () => {
//     if (phoneClient.readyState === phoneClient.OPEN) {
//       let test = {
//         phone: {
//           action: 'initializeDirection',
//           movements: {
//             towardNorth: true,
//             towardEast: true,
//             distance: 10,
//           },
//         },
//       }
//       let test2 = {
//         tv: {
//           action: 'phoneMove',
//           movements: {
//             towardNorth: true,
//             towardEast: true,
//             distance: 10,
//           },
//         },
//       }
//       if (initialized) {
//         phoneClient.send(JSON.stringify(test2))
//       } else {
//         initialized = true
//         phoneClient.send(JSON.stringify(test))
//       }
//       setTimeout(sendNumber, 500)
//     }
//   }
//   sendNumber()
// }
//
// phoneClient.onmessage = function(e) {
//   console.log("phone Received: '" + JSON.stringify(e.data) + "'")
// }
//
// phoneClient.onerror = function() {
//   console.log('Connection Error')
// }
//
// phoneClient.onclose = function() {
//   console.log('echo-protocol Client Closed')
// }
