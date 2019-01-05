export const ROUTE_CHANGED = 'ROUTE_CHANGED'

export function routeChanged(location, action) {
  return {
    type: ROUTE_CHANGED,
    location,
    action,
  }
}
