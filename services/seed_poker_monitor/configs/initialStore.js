import {fromJS} from 'immutable'

const store = {
  home: {name: ''},
  game: {
    players: [
      {
        name: 'player1',
      }
    ],
    seedCards: [
      {
        id: 1,
        point: 1,
        order: 1,
      }
    ],
    abandomCards: [
      {
        id: 1,
        point: 1,
        order: 1,
      }
    ]
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
