// @flow
import {List, Map} from 'immutable'

// const home: Map<*, *> = Map({
//   quaternion: List([]),
// })
//
// const socket: Map<*, *> = Map({
//   connection: 'closed',
// })

export default {
  home: Map({
    quaternion: [],
  }),
  socket: Map({
    connection: 'closed',
  }),
  testChanges: {a: 1},
}
