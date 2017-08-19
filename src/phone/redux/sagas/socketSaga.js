import { END, eventChannel } from 'redux-saga'
import {call, put, takeEvery} from 'redux-saga/effects'

const W3CWebSocket = require('websocket').w3cwebsocket
const endpoint = process.env.DOCKER_ENV ? process.env.WS_ENDPOINT_DOCKER : process.env.WS_ENDPOINT_WITHOUT_DOCKER
const socketConnection = new W3CWebSocket(endpoint, 'echo-protocol')
console.log('ws initialized')

// onMessageReceived
const socketEventChannel = () => {
  return eventChannel(emmiter => {
    socketConnection.onmessage = function(event) {
      console.log("socket Received: '" + JSON.stringify(event.data) + "'")
      emmiter(event.data)
    }

    socketConnection.onerror = function(error) {
      console.log('Connection Error', error)
      emmiter(error)
    }

    socketConnection.onclose = function() {
      console.log('echo-protocol Client Closed')
      emmiter(END)
    }

    return () => socketConnection.close()
  })
}

// function* messageHandler(message) {
//   console.log('message', message)
//   put({
//     type: 'SOCKET_MESSAGE_ARRIVED',
//     message,
//   })
// }

function* receiverSaga() {
  const channel = yield call(socketEventChannel)
  try {
    while (true) { // eslint-disable-line
      // take(END) will cause the saga to terminate by jumping to the finally block
      let message = yield take(channel)
      // yield* messageHandler(message)
      console.log('message', message)
      yield put({
        type: 'SOCKET_MESSAGE_ARRIVED',
        message,
      })
    }
  } finally {
    socketConnection.close()
  }
}

function* senderSaga() {

}

// socketConnection.onopen = function() {
//   console.log('phone connected to ws server')
//   // const sendNumber = () => {
//   //   if (socketConnection.readyState === socketConnection.OPEN) {
//   //     let test = {
//   //       phone: {
//   //         action: 'initializeDirection',
//   //         movements: {
//   //           towardNorth: true,
//   //           towardEast: true,
//   //           distance: 10,
//   //         },
//   //       },
//   //     }
//   //     let test2 = {
//   //       tv: {
//   //         action: 'phoneMove',
//   //         movements: {
//   //           towardNorth: true,
//   //           towardEast: true,
//   //           distance: 10,
//   //         },
//   //       },
//   //     }
//   //     if (initialized) {
//   //       socketConnection.send(JSON.stringify(test2))
//   //     } else {
//   //       initialized = true
//   //       socketConnection.send(JSON.stringify(test))
//   //     }
//   //     setTimeout(sendNumber, 500)
//   //   }
//   // }
//   // sendNumber()
// }

// export default socketConnection
export {
  senderSaga,
  receiverSaga,
}
