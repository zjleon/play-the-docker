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
// tvClient.onmessage = function(e) {
//   console.log("tv Received: '" + JSON.stringify(e.data) + "'")
// }
//
// tvClient.onerror = function() {
//   console.log('Connection Error')
// }
//
// tvClient.onclose = function() {
//   console.log('echo-protocol Client Closed')
// }
