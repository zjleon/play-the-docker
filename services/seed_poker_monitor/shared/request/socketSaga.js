import { END, eventChannel } from 'redux-saga'
import {envs, urls, messageTypes} from '../../configs/constants'
import {call, put, take, takeEvery, all} from 'redux-saga/effects'

const W3CWebSocket = require('websocket').w3cwebsocket
const endpoint = envs.WS_ENDPOINT + urls.game
let socketConnection

// an enclosure of socket, start by saga, then emmite changes to saga when changes on socket happens
const socketEventChannel = (ws) => {
  return eventChannel(emmiter => {
    // socketConnection = new W3CWebSocket(endpoint, 'echo-protocol')

    socketConnection.onmessage = function(trunk) {
      console.log(`socket Received: ${trunk.data}`)
      const {message, data} = JSON.parse(trunk.data)
      emmiter({
        type: message,
        value: data,
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
      // emmiter({
      //   type: 'open',
      //   value: null,
      // })
      socketConnection.send(JSON.stringify({message: messageTypes.MONITOR_JOIN}))
    }

    socketConnection.onclose = function() {
      console.log('Socket Saga Closed')
      emmiter(END)
    }

    return () => {
      console.log('echo-protocol Client Closed')
      socketConnection.close()
      socketConnection = null
    }
  })
}

function* initWebsocketSaga() {
  socketConnection = new W3CWebSocket(endpoint, 'echo-protocol')
  const channel = yield call(socketEventChannel)
  try {
    while (true) { // eslint-disable-line
      let action = yield take(channel)
      yield put(action)
    }
  } finally {
    // emmiter(END) in ``socketConnection.onclose`` will cause this finally block executed
    yield put({type: 'SOCKET_CLOSED'})
  }
}

function* senderSaga() {
  yield takeEvery('WS_SEND', socketSender)
}

function socketSender(action) {
  if (socketConnection.readyState === socketConnection.OPEN) {
    let data
    try {
      data = JSON.stringify(action.message)
    } catch (e) {
      console.log(`${action} send as original format`)
      data = action
    } finally {
      socketConnection.send(data)
    }
  } else {
    console.log('socket is not established')
  }
}

export default function* socketSaga() {
  yield all([
    senderSaga(),
    initWebsocketSaga(),
  ])
}
