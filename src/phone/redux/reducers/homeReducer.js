export default (state = 0, action) => {
  switch (action.type) {
  case 'CHANGE_QUATERNION':
    console.log('action', action)
    return action.quaternion
  default:
    return state
  }
}
