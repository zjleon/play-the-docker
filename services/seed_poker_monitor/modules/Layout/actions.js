import createRequestTypes from '../../shared/createRequestTypes'
import {
  urls,
} from '../../configs/constants'

export const SET_SINGLE_BUTTON_MODAL_VISIBILITY = 'SET_SINGLE_BUTTON_MODAL_VISIBILITY'

export function setModalVisibility(visibility, content, title) {
  return {
    type: SET_SINGLE_BUTTON_MODAL_VISIBILITY,
    visibility,
    content,
    title,
  }
}
