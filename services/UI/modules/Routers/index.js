import React, { Component } from 'react'
import {
  Route,
  Switch,
  withRouter,
} from 'react-router'

import Loadable from 'react-loadable'
import Loading from '../Common/Loading'
import RedirectBaseOnAuthState from './subComponents/RedirectBaseOnAuthState'
import { hot } from 'react-hot-loader'
import routes from './routes'

@hot(module)
@withRouter
class RootRouter extends Component {
  render() {
    return <React.Fragment>
      <Switch>
        {routes.map((componentName, index) => {
          let DynamicComponent
          if (NODE_ENV === 'development') {
            DynamicComponent = require(`../${componentName}/index.js`).default
          } else {
            DynamicComponent = Loadable({
              loader: () => {
                // Catch webpack dynamic import warning
                const component = import(`../${componentName}/index.js`).catch((error) => console.error(error))
                return component
              },
              loading: Loading,
            })
          }
          return <Route
            key={`router-${index}`}
            path={`/${componentName}`}
            render={props => {
              return React.createElement(
                DynamicComponent,
                {key: `router-${index}`}
              )
            }}
          />
        })}
      </Switch>
    </React.Fragment>
  }
}

export default RootRouter
