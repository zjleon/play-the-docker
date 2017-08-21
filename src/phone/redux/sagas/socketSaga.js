import { END, eventChannel } from 'redux-saga'
import {call, put, take, takeEvery} from 'redux-saga/effects'

const W3CWebSocket = require('websocket').w3cwebsocket
const endpoint = process.env.DOCKER_ENV ? process.env.WS_ENDPOINT_DOCKER : process.env.WS_ENDPOINT_WITHOUT_DOCKER
const socketConnection = new W3CWebSocket(endpoint, 'echo-protocol')

// an enclosure of socket, start by saga, then emmite changes to saga when changes on socket happens
const socketEventChannel = () => {
  return eventChannel(emmiter => {
    socketConnection.onmessage = function(event) {
      console.log("socket Received: '" + JSON.stringify(event.data) + "'")
      emmiter({
        type: 'messageReceived',
        value: event.data,
      })
    }

    socketConnection.onerror = function(error) {
      console.log('Connection Error', error)
      emmiter({
        type: 'error',
        value: error
      })
    }

    socketConnection.onopen = function() {
      console.log('socket connection established successfully')
      emmiter({
        type: 'open',
        value: null,
      })
    }

    socketConnection.onclose = function() {
      console.log('echo-protocol Client Closed')
      emmiter(END)
    }

    return () => socketConnection.close()
  })
}

function* receiverSaga() {
  const channel = yield call(socketEventChannel)
  try {
    while (true) { // eslint-disable-line
      // take(END) will cause the saga to terminate by jumping to the finally block
      let message = yield take(channel)
      console.log('message', message)
      if (message.type === 'open') {
        yield put({
          type: 'SOCKET_OPEN',
        })
      } else if (message.type === 'messageReceived') {
        yield put({
          type: 'SOCKET_MESSAGE_ARRIVED',
          message: message.value,
        })
      } else {
        // when error happens
        yield put({
          type: 'SOCKET_ERROR',
          error: message.value,
        })
      }
    }
  } finally {
    yield put({
      type: 'SOCKET_CLOSED',
      // message: message.value,
    })
    socketConnection.close()
  }
}

function* senderSaga() {
  yield takeEvery('SOCKET_SEND_MESSSGE', socketSender)
}

function socketSender(action) {
  console.log('socketSender', action)
  if (socketConnection.readyState === socketConnection.OPEN) {
    let test = {
      phone: {
        action: 'initializeDirection',
        movements: {
          towardNorth: true,
          towardEast: true,
          distance: 10,
        },
      },
    }
    let test2 = {
      tv: {
        action: 'phoneMove',
        movements: {
          towardNorth: true,
          towardEast: true,
          distance: 10,
        },
      },
    }
    socketConnection.send(JSON.stringify(test))
  } else {
    console.log('socket is not established')
  }
}

// export default socketConnection
export {
  senderSaga,
  receiverSaga,
}
