import {
  REQUEST_SAMPLE,
  UPDATE_USER_INFO,
} from '../../configs/actionTypes'

import {
  urls,
} from '../../configs/constants'

export function requestSample(payload) {
  return {
    type: REQUEST_SAMPLE.REQUEST,
    // url: urls.sampleURL,
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
