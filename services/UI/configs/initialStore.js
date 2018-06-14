import {fromJS} from 'immutable'

const store = {
  home: {name: ''},
  userInfo: {
    name: '',
    jwt: '',
  }
}

export default fromJS(store)
