// import {Map, is} from 'immutable'

import {
  SET_SINGLE_BUTTON_MODAL_VISIBILITY,
} from './actions'

export default (
  state,
  action
) => {
  switch (action.type) {
  case SET_SINGLE_BUTTON_MODAL_VISIBILITY:
    return state.update('singleButtonModal', (oldState) => {
      return oldState.merge({
        visible: action.visibility,
        content: action.content || '',
        title: action.title || '',
      })
    })
  default:
    return state
  }
}
