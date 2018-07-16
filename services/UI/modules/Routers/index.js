import React, { Component } from 'react'
import {
  Route,
  Switch,
  withRouter,
} from 'react-router'

import Loadable from 'react-loadable'
import Loading from '../Common/Loading'
import RedirectBaseOnAuthState from './subComponents/RedirectBaseOnAuthState'
// import RouteChanged from './subComponents/RouteChanged'
import { hot } from 'react-hot-loader'
import routes from './routes'

@hot(module)
@withRouter
export default class RootRouter extends Component {
  render() {
    return <React.Fragment>
      <RedirectBaseOnAuthState />
      {/* <RouteChanged /> */}
      <Switch>
        {routes.map((componentName, index) => {
          let DynamicComponent
          // if (NODE_ENV === 'development') {
          //   DynamicComponent = require(`../${componentName}/index.js`).default
          // } else {
          DynamicComponent = Loadable({
            loader: () => {
              // Catch webpack dynamic import warning
              const component = import(`../${componentName}/index.js`).catch((error) => console.error('DynamicComponent', error))
              return component
            },
            loading: Loading,
          })
          // }
          return <Route
            key={`router-${index}`}
            path={`/${componentName}`}
            render={props => {
              const newProps = Object.assign({key: `router-${index}`}, props)
              return React.createElement(
                DynamicComponent,
                newProps
              )
            }}
          />
        })}
      </Switch>
    </React.Fragment>
  }
}
