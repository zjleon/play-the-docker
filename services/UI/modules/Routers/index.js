import React, { Component } from 'react'
import {
  Route,
  Switch,
  withRouter,
} from 'react-router'

import Loadable from 'react-loadable'
import Loading from '../Common/Loading'
import {NODE_ENV} from '../../configs/constants'
import { hot } from 'react-hot-loader'
import routes from './routes'

console.log('NODE_ENV', NODE_ENV, process.env.__DEV__)

@withRouter
class RootRouter extends Component {
  render() {
    return <div>
      {routes.map((route, index) => {
        const DynamicComponent = Loadable({
          loader: () => {
            // Hack for webpack dynamic import warning
            const component = import(`../${route}/index.js`).catch((error) => console.error(error))
            // if (NODE_ENV === 'development') {
            //   return hot(module)(component)
            // }
            return component
          },
          loading: Loading,
        })
        // console.log(new dynamicComponent())
        return <DynamicComponent key={`router-${index}`} />
        // return <span>123</span>
      })}
    </div>
  }
}

export default RootRouter
