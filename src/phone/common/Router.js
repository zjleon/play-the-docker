import {
  BrowserRouter,
  Link,
  Route,
} from 'react-router-dom'
import React, { Component } from 'react'

import Calibration from '../modules/Calibration'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const pathPrefix = process.env.DOCKER_ENV ? '/' + process.env.PROJECT_ID : ''

class Router extends Component {
  constructor() {
    super()
  }

  render() {
    return (<BrowserRouter>
      <MuiThemeProvider>
        <div>
          <Route exact path={pathPrefix + "/"} component={Calibration}/>
          <Route path={pathPrefix + "/calibration"} component={Calibration}/>
          {/* <Route path="/topics" component={Topics}/> */}
        </div>
      </MuiThemeProvider>
    </BrowserRouter>)
  }
}

export default Router
