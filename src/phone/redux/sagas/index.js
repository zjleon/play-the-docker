import {hideModal, showModal} from './uiSaga'

import {all} from 'redux-saga/effects'
import {get} from './restfulSaga'
import homeSaga from './homeSaga'
import {senderSaga} from './socketSaga'

export default function* rootSaga() {
  yield all([
    homeSaga(),
    get(),
    hideModal(),
    showModal(),
  ])
}
