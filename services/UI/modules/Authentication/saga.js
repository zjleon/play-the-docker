// import {all, put, takeEvery, takeLatest} from 'redux-saga/effects'
//
// import {
//   REQUEST_SAMPLE,
// } from './action'
// import {request} from '../../shared/request/restfulSaga'
//
// // TODO: verify the user name and password
// function* verifyDataSample() {
//
// }
//
// function* requestSample(action) {
//   console.log('requestSample', action)
//   const {name} = yield select((state) => {return state.get('userInfo').toJS()})
//   yield* request({
//
//   })
//   // modify data belong to reducer
// }
//
// export default function* homeSaga() {
//   yield all([
//     takeEvery(REQUEST_SAMPLE.START, requestSample),
//   ])
// }
