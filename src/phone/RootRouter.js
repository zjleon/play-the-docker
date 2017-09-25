import React, { Component } from 'react'
import {
  Route,
  Router,
} from 'react-router'

import Calibration from './modules/Calibration'
import Home from './modules/Home'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import history from './services/history'
import store from './redux/store'

const pathPrefix = process.env.DOCKER_ENV ? '/' + process.env.PROJECT_ID : ''

class RootRouter extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router basename={pathPrefix} history={history}>
          <MuiThemeProvider>
            <div>
              <Route exact path={"/"} component={Home}/>
              <Route path={"/calibration"} component={Calibration}/>
              {/* <Route path="/topics" component={Topics}/> */}
            </div>
          </MuiThemeProvider>
        </Router>
      </Provider>
    )
  }
}

export default RootRouter
