import {all} from 'redux-saga/effects'
import {get} from './commonSaga'
import homeSaga from './homeSaga'

export default function* rootSaga() {
  yield all([
    homeSaga(),
    get(),
  ])
}
