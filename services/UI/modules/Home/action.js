import {
  REQUEST_SAMPLE,
} from '../../configs/actionTypes'
import {
  sampleURL,
} from '../../configs/url'

export function requestSample(payload) {
  return {
    type: REQUEST_SAMPLE.REQUEST,
    url,
    // payload can be got from store
    // payload,
    sucessAction: REQUEST_SAMPLE.SUCCESS,
    failureAction: REQUEST_SAMPLE.FAILURE,
  }
}
