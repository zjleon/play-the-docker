import {
  ROUTE_CHANGED,
} from '../../configs/actionTypes'

export function routeChanged({location}) {
  return {
    type: ROUTE_CHANGED,
    location,
  }
}
