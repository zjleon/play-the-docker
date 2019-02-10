import {all} from 'redux-saga/effects'
import homeSaga from '../modules/Home/saga'
import gameSaga from '../modules/Game/saga'
import {senderSaga, receiverSaga} from '../shared/request/socketSaga'

export default function* rootSaga() {
  yield all([
    homeSaga(),
    gameSaga(),
    senderSaga(),
    receiverSaga(),
  ])
}
