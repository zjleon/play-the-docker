import {
  Link,
  Route,
  Router,
  withRouter,
} from 'react-router'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import React, { Component } from 'react'

import Home from '../modules/Home'
import Login from '../modules/Login'
import { Provider } from 'react-redux'
import history from '../service/history'
import store from '../redux/store'

const theme = createMuiTheme()
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941


class RootRouter extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <MuiThemeProvider theme={theme}>
            <div>
              <Route exact path={"/"} component={Login}/>
              <Route path={"/home"} component={Home}/>
              {/* <Route path="/topics" component={Topics}/> */}
            </div>
          </MuiThemeProvider>
        </Router>
      </Provider>
    )
  }
}

export default RootRouter
