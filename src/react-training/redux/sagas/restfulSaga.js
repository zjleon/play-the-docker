import {call, put, takeEvery} from 'redux-saga/effects'

import axios from 'axios'

const restfulConfig = {
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

function* request(options) {
  put({type: 'REQUEST_GET_START'})
  const opt = {...restfulConfig, ...options}
  let response
  try {
    response = yield call(axios, options)
    put({type: 'REQUEST_GET_SUCESSED', response})
  } catch (error) {
    put({type: 'REQUEST_GET_FAILED', error})
  } finally {
    put({type: 'REQUEST_GET_END'})
  }
}

function* get() {
  yield takeEvery('REQUEST_GET', request)
}

export {
  get,
}
