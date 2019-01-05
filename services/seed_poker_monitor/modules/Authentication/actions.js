export const UPDATE_USER_INFO = 'UPDATE_USER_INFO'

// when newInfo is undefined, clear all user info
export function updateUserInfo(newInfo) {
  return {
    type: UPDATE_USER_INFO,
    newInfo,
  }
}
