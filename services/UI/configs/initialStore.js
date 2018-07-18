import {fromJS} from 'immutable'

const store = {
  home: {name: ''},
  // globalUI: {
  //   showPageWrapper: false,
  // },
  authentication: {
    name: '',
    jwt: '',
  },
}

export default fromJS(store)
