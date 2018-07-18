import React, { Component } from 'react'
import {
  Redirect,
  Switch,
  withRouter,
} from 'react-router'

import { connect } from 'react-redux'
import {urls} from '../../../configs/constants'

const {
  unAuthenticatePage,
  authenticatedPage,
} = urls

@withRouter
@connect((state) => {
  return {
  jwt: state.getIn(['authentication', 'jwt']),
  }
  }, null)
export default class RedirectBaseOnAuthState extends Component {
  render() {
    const currentPath = this.props.location.pathname.toLowerCase()
    if (!this.props.jwt && currentPath.indexOf(unAuthenticatePage.toLowerCase()) === -1) {
      return <Redirect to={unAuthenticatePage} />
    }
    if (
      this.props.jwt
      && (
        currentPath === '/'
        || currentPath.indexOf(unAuthenticatePage.toLowerCase()) > -1
      )
    ) {
      return <Redirect to={authenticatedPage} />
    }
    return null
  }
}
