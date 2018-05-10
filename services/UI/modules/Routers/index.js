import React, { Component } from 'react'
import {
  Route,
  Router,
} from 'react-router'

import Loadable from 'react-loadable'
import LoadingAnimation from '../Common/Loading'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import history from '../../utils/history'
import routes from './routes'
import store from '../../configs/store'

const LoadableComponent = Loadable({
  loader: () => import('./my-component'),
  loading: LoadingAnimation,
})

// export default class Routers extends React.Component {
//   render() {
//     return <LoadableComponent/>
//   }
// }

class RootRouter extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router basename={pathPrefix} history={history}>
          <MuiThemeProvider>
            {routes}
          </MuiThemeProvider>
        </Router>
      </Provider>
    )
  }
}

export default RootRouter
