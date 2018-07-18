import createHistory from 'history/createBrowserHistory'
import {routeChanged} from '../configs/gulpGenerated/actions'
import store from '../configs/store'
const history = createHistory()
history.listen((location, action) => {
  store.dispatch(routeChanged(location, action))
})
// when user enter the page at the first time, dispatch an event
store.dispatch(routeChanged(location, 'ENTER'))

export default history
