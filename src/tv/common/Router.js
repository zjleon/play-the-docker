import {
  BrowserRouter,
  Link,
  Route,
} from 'react-router-dom'
import React, { Component } from 'react'

import GameBoard from '../modules/GameBoard'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

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
          <Route exact path="/" component={GameBoard}/>
          <Route path="/game" component={GameBoard}/>
          {/* <Route path="/topics" component={Topics}/> */}
        </div>
      </MuiThemeProvider>
    </BrowserRouter>)
  }
}

export default Router
