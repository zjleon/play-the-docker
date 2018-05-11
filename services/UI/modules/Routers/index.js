import React, { Component } from 'react'
import {
  Route,
  Router,
} from 'react-router'

import Loadable from 'react-loadable'
import LoadingAnimation from '../Common/Loading'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {NODE_ENV} from '../../configs/constants'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import history from '../../utils/history'
import { hot } from 'react-hot-loader'
import routes from './routes'
import store from '../../configs/store'

console.log('NODE_ENV', NODE_ENV, __DEV__)

function getRouters() {
  return <div>
    {routes.map((route) => {
      return Loadable({
        loader: () => {
          const component = import(route)
          if (NODE_ENV === 'development') {
            return hot(component)
          }
          return component
        },
        loading: LoadingAnimation,
      })
    })}
  </div>
}

class RootRouter extends Component {
  render() {
    console.log('getRouters', getRouters)
    return (
      <Provider store={store}>
        <Router basename={pathPrefix} history={history}>
          <MuiThemeProvider>
            {getRouters()}
          </MuiThemeProvider>
        </Router>
      </Provider>
    )
  }
}

export default RootRouter
