import {all, call, put, take, takeEvery, takeLatest} from 'redux-saga/effects'

import {delay} from 'redux-saga'
import history from '../../service/history'
import {post} from '../../service/resetful'

function* signIn(action) {
  yield put({type: 'VALIDATE', username: action.username})
  const result = yield take(['VALIDATE_SUCCESS', 'VAILDATE_FAIL'])
  if (result.type === 'VAILDATE_FAIL') {
    return
  }
  try {
    const postResult = yield call(post, action.username)
    yield put({type: 'USER_SIGN_IN_SUCESS', token: result.token})
  } catch (error) {
    console.log(error)
    yield put({type: 'USER_SIGN_IN_FAILED', message: error.message})
  }
}

function* signInSucess() {
  history.push('/home')
}

export function* watchSignIn() {
  yield takeEvery('USER_SIGN_IN', signIn)
  yield takeEvery('USER_SIGN_IN_SUCESS', signInSucess)
}

function* validate(action) {
  if (action.username === 'signMeIn') {
    yield put({type: 'VALIDATE_SUCCESS'})
  }
  yield put({type: 'VALIDATE_FAIL'})
}

export function* watchValidate() {
  yield takeEvery('VALIDATE', validate)
}
