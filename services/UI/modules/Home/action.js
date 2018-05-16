import {
  REQUEST_SAMPLE,
  UPDATE_USER_INFO,
} from '../../configs/actionTypes'

import {
  sampleURL,
} from '../../configs/url'

export function requestSample(payload) {
  return {
    type: REQUEST_SAMPLE.REQUEST,
    // url: sampleURL,
    // payload can be got from store
    // payload,
    requestActions: REQUEST_SAMPLE,
  }
}

export function updateUserInfo(updateObject) {
  return {
    type: UPDATE_USER_INFO,
    updateObject,
  }
}
