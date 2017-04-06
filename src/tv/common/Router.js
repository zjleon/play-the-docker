import {
  BrowserRouter,
  Link,
  Route,
} from 'react-router-dom'
import React, { Component } from 'react'

import GameBoard from '../modules/GameBoard'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class Router extends Component {
  constructor() {
    super()
  }

  render() {
    return (<BrowserRouter>
      <MuiThemeProvider>
        <div>
          <Route exact path="/" component={GameBoard}/>
          <Route path="/calibration" component={GameBoard}/>
          {/* <Route path="/topics" component={Topics}/> */}
        </div>
      </MuiThemeProvider>
    </BrowserRouter>)
  }
}

export default Router
