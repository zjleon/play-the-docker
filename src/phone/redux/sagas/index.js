import {hideModal, showModal} from './uiSaga'

import {all} from 'redux-saga/effects'
import {get} from './restfulSaga'
import homeSaga from './homeSaga'

export default function* rootSaga() {
  yield all([
    homeSaga(),
    get(),
    hideModal(),
    showModal(),
  ])
}
