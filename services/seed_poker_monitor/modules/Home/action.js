import createRequestTypes from '../../shared/createRequestTypes'
import {
  urls,
} from '../../configs/constants'

export const REQUEST_SAMPLE = createRequestTypes('REQUEST_SAMPLE')

export function requestSample(payload) {
  return {
    type: REQUEST_SAMPLE.START,
    // url: urls.sample,
    // payload can be got from store
    // payload,
    requestActions: REQUEST_SAMPLE,
  }
}
