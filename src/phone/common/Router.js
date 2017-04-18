import {
  BrowserRouter,
  Link,
  Route,
} from 'react-router-dom'
import React, { Component } from 'react'

import Calibration from '../modules/Calibration'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// import {createBrowserHistory} from 'history'

const pathPrefix = process.env.DOCKER_ENV ? '/' + process.env.PROJECT_ID : ''
console.log(process.env.DOCKER_ENV)

class Router extends Component {
  constructor() {
    super()
  }

  render() {
    return (<BrowserRouter basename={pathPrefix}>
      <MuiThemeProvider>
        <div>
          <Route exact path={"/"} component={Calibration}/>
          <Route path={"/calibration"} component={Calibration}/>
          {/* <Route path="/topics" component={Topics}/> */}
        </div>
      </MuiThemeProvider>
    </BrowserRouter>)
  }
}

export default Router
