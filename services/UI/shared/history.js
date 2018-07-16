import createHistory from 'history/createBrowserHistory'
import {routeChanged} from '../configs/gulpGenerated/actions'
import store from '../configs/store'
const history = createHistory()
history.listen((location, action) => {
  console.log(
    `The current URL is ${location.pathname}${location.search}${location.hash}`
  )
  console.log(`The last navigation action was ${action}`)
  store.dispatch(routeChanged(location))
})

export default history
