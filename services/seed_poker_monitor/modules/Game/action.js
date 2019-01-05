import createRequestTypes from '../../shared/createRequestTypes'
import {
  urls,
} from '../../configs/constants'

export const CONNECT_WS = createRequestTypes('CONNECT_WS')

export function connect() {
  return {
    type: CONNECT_WS.START,
    // url: urls.sample,
    // payload can be got from store
    // payload,
    requestActions: CONNECT_WS,
  }
}
