import {
  BrowserRouter,
  Link,
  Route,
} from 'react-router-dom'
import React, { Component } from 'react'

import Calibration from '../modules/Calibration'

class Router extends Component {
  constructor() {
    super()
  }

  render() {
    return (<BrowserRouter>
      <div>
        <Route exact path="/" component={Calibration}/>
        <Route path="/calibration" component={Calibration}/>
        {/* <Route path="/topics" component={Topics}/> */}
      </div>
    </BrowserRouter>)
  }
}

export default Router
