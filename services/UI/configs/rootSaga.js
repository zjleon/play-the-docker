import {hideModal, showModal} from './uiSaga'
import {receiverSaga, senderSaga} from './socketSaga'

import {all} from 'redux-saga/effects'
import {get} from './restfulSaga'
import homeSaga from './homeSaga'

export default function* rootSaga() {
  yield all([
    homeSaga(),
    get(),
    hideModal(),
    showModal(),
    senderSaga(),
    receiverSaga(),
  ])
}
