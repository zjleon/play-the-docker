export const UPDATE_USER_INFO = 'CHANGE_USER_INFO'
export const CLEAR_ALL_USER_INFO = 'CLEAR_ALL_USER_INFO'

export function updateUserInfo(updateObject) {
  return {
    type: UPDATE_USER_INFO,
    updateObject,
  }
}
