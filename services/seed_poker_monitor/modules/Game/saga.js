import {all, put, takeEvery, takeLatest} from 'redux-saga/effects'

import {
  CONNECT_WS,
} from './action'
import {request} from '../../shared/request/restfulSaga'
let W3CWebSocket = require('websocket').w3cwebsocket
let WSConnection = new W3CWebSocket('ws://localhost:3000/game', 'echo-protocol')
WSConnection.onmessage = function(e) {
  console.log("phone Received: '" + JSON.stringify(e.data) + "'")
}

WSConnection.onerror = function() {
  console.log('Connection Error')
}

WSConnection.onclose = function() {
  console.log('echo-protocol Client Closed')
}

WSConnection.onopen = function() {
  console.log('send message')
  WSConnection.send(1)
}

// function* requestSample(action) {
//   console.log('requestSample', action)
//   const {name} = yield select((state) => {return state.get('userInfo').toJS()})
//   yield* request({
//
//   })
//   // modify data belong to reducer
// }

function* connect() {
  yield
}

export default function* homeSaga() {
  yield all([
    // takeEvery(CONNECT_WS.START, requestSample),
    connect(),
  ])
}
