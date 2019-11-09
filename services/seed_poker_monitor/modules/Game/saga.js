import {all, put, takeEvery, takeLatest} from 'redux-saga/effects'

import {
  CONNECT_WS,
} from './action'
import {messageTypes} from '../../configs/constants'
import {request} from '../../shared/request/restfulSaga'

function* syncPlayerState(state) {
  yield put()
}

export default function* gameSaga() {
  yield all([
    // takeEvery(messageTypes.PLAYERS_STATE, syncPlayerState),
    // connect(),
  ])
}
