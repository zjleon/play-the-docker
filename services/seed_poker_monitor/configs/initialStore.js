import {fromJS} from 'immutable'

const store = {
  home: {name: ''},
  game: {
    players: {},
    cards: [],
    round: 1,
  },
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
