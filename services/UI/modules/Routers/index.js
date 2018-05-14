import React, { Component } from 'react'
import {
  Route,
  Router,
} from 'react-router'

import Loadable from 'react-loadable'
import LoadingAnimation from '../Common/Loading'
import {NODE_ENV} from '../../configs/constants'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import history from '../../utils/history'
import { hot } from 'react-hot-loader'
import routes from './routes'
import store from '../../configs/store'

console.log('NODE_ENV', NODE_ENV, process.env.__DEV__)

function getRouters() {
  return <div>
    {routes.map((route) => {
      // return Loadable({
      //   loader: () => {
      //     // Hack for webpack dynamic import warning
      //     const component = import(route + '')
      //     if (NODE_ENV === 'development') {
      //       return hot(component)
      //     }
      //     return component
      //   },
      //   loading: LoadingAnimation,
      // })
      return <span>123</span>
    })}
  </div>
}

class RootRouter extends Component {
  render() {
    console.log('getRouters', getRouters())
    return (
      <Provider store={store}>
        <Router
          // basename={pathPrefix}
          history={history}>
            {getRouters()}
        </Router>
      </Provider>
    )
  }
}

export default RootRouter
