import axios from 'axios'
import {takeEvery} from 'redux-saga/effects'

const commonConfig = {
  baseURL: process.env.DOCKER_ENV ? process.env.REST_ENDPOINT_DOCKER : process.env.REST_ENDPOINT_WITHOUT_DOCKER,
  transformResponse: [(response) => {
    let data
    try {
      data = JSON.parse(response)
    } catch (error) {
      console.error(error)
      data = response
    } finally {
      return data
    }
  }],
  // onUploadProgress: (progressEvent) => {
  //   // Do whatever you want with the native progress event
  // },
  // onDownloadProgress: (progressEvent) => {
  //   // Do whatever you want with the native progress event
  // },
}

const get = function* () {
  // 1. change state to in progress
  // 2. make request
  // 3-1. change state to success
  // 3-2-1. change state to fail
  // 3-2-2. record error
  let options
  let action
  while (true) { //eslint-disable-line
    action = yield takeEvery('REQUEST_GET')
    console.log('action', action)
    options = Object.assign( {}, commonConfig, {
      url: action.url,
    })
    yield call(axios, options)
  }
}

export {
  get,
}
