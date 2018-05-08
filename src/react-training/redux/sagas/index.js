import {watchSignIn, watchValidate} from './userSaga'

import {all} from 'redux-saga/effects'

export default function* rootSaga() {
  yield all([
    watchSignIn(),
    watchValidate(),
  ])
}
