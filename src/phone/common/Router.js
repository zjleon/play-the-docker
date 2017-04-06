import {
  BrowserRouter,
  Link,
  Route,
} from 'react-router-dom'
import React, { Component } from 'react'

import Calibration from '../modules/Calibration'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class Router extends Component {
  constructor() {
    super()
  }

  render() {
    return (<BrowserRouter>
      <MuiThemeProvider>
        <div>
          <Route exact path="/" component={Calibration}/>
          <Route path="/calibration" component={Calibration}/>
          {/* <Route path="/topics" component={Topics}/> */}
        </div>
      </MuiThemeProvider>
    </BrowserRouter>)
  }
}

export default Router
