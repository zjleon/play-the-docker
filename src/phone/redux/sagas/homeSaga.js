import {put, takeEvery, takeLatest} from 'redux-saga/effects'

function* onMessageReceived(message) {
  console.log('onMessageReceived', message)
}

export default function* homeSaga() {
  yield takeEvery('SOCKET_MESSAGE_ARRIVED', onMessageReceived)
}
