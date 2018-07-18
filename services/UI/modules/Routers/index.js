import React, { Component } from 'react'
import {
  Route,
  Switch,
} from 'react-router'

import Layout from '../Layout'
import Loadable from 'react-loadable'
import Loading from '../Shared/Loading'
import RedirectBaseOnAuthState from './subComponents/RedirectBaseOnAuthState'
import { hot } from 'react-hot-loader'
import routes from './routes'

@Layout
@hot(module)
export default class RootRouter extends Component {
  render() {
    return <React.Fragment>
      <RedirectBaseOnAuthState />
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
            path={`/${componentName}(/*)?`}
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
