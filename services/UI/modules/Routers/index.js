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
    return <React.Fragment>
      {routes.map((route, index) => {
        const DynamicComponent = Loadable({
          loader: () => {
            // Hack for webpack dynamic import warning
            const component = import(`../${route}/index.js`).catch((error) => console.error(error))
            return component
          },
          loading: Loading,
        })
        // return <DynamicComponent key={`router-${index}`} />
        return React.createElement(
          DynamicComponent,
          {key: `router-${index}`}
        )
      })}
    </React.Fragment>
  }
}

export default RootRouter
