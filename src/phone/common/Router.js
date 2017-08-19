import {
  BrowserRouter,
  Link,
  Route,
  withRouter,
} from 'react-router-dom'
import React, { Component } from 'react'

import Calibration from '../modules/Calibration'
import Home from '../modules/Home'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import store from '../redux/store'

const pathPrefix = process.env.DOCKER_ENV ? '/' + process.env.PROJECT_ID : ''

class Router extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter basename={pathPrefix}>
          <MuiThemeProvider>
            <div>
              <Route exact path={"/"} component={Home}/>
              <Route path={"/calibration"} component={Calibration}/>
              {/* <Route path="/topics" component={Topics}/> */}
            </div>
          </MuiThemeProvider>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default Router
