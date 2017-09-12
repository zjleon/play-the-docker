const initialState = {
  username: '',
  loginState: false,
  token: '',
}

export default (
  state = initialState,
  action
) => {
  switch (action.type) {
  case 'CHANGE_USERNAME':
    return {...state, username: action.username}
  case 'USER_SIGN_IN':
    return {...state, loginState: true}
  case 'USER_SIGN_IN_SUCESS':
    return {...state, loginState: false, token: action.token}
  case 'USER_SIGN_IN_FAILED':
    return {...state, loginState: false}
  default:
    return state
  }
}
