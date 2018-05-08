// @flow
import initialStore from '../initialStore'

export default (
  state: {a: number} = initialStore.testChanges,
  action: {type: string, data: {a: number}}
) => {
  switch (action.type) {
  case 'TEST_CHANGES':
    console.log('TEST_CHANGES')
    return action.data
    // return {...state, action.data}
  default:
    return state
  }
}
