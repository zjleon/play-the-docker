import {
  BrowserRouter,
  Link,
  Route,
  withRouter,
} from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import React, { Component } from 'react'

import Home from '../modules/Home'
import Login from '../modules/Login'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import store from '../redux/store'

const pathPrefix = process.env.DOCKER_ENV ? '/' + process.env.PROJECT_ID : ''
const theme = createMuiTheme()

class Router extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter basename={pathPrefix}>
          <MuiThemeProvider theme={theme}>
            <div>
              <Route exact path={"/"} component={Login}/>
              <Route path={"/home"} component={Home}/>
              {/* <Route path="/topics" component={Topics}/> */}
            </div>
          </MuiThemeProvider>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default Router
