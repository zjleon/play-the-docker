import {fromJS} from 'immutable'

const store = {
  home: {name: ''},
  layout: {
    singleButtonModal: {
      visible: false,
      title: '',
      content: '',
    },
  },
  authentication: {
    name: '',
    jwt: '',
  },
}

export default fromJS(store)
