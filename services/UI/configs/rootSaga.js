import {all} from 'redux-saga/effects'
import homeSaga from '../modules/Home/saga'

export default function* rootSaga() {
  yield all([
    homeSaga(),
  ])
}
