import {all, put, takeEvery, takeLatest} from 'redux-saga/effects'

function* onMessageReceived() {
  takeEvery('SOCKET_MESSAGE_ARRIVED', function* (action) {
    console.log('onMessageReceived', action)
  })
}

export default function* homeSaga() {
  yield all([
    onMessageReceived(),
  ])
}
