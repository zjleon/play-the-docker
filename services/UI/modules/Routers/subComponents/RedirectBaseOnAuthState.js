import React, { Component } from 'react'
import {
  Redirect,
  Switch,
  withRouter,
} from 'react-router'

import { connect } from 'react-redux'
import {urls} from '../../../configs/constants'

@withRouter
@connect((state) => {
  const {columnDefinitions, defaultHiddenColumns, rows} = state.get('contracts').toJS()
  return {
  jwt: state.getIn(['userInfo', 'jwt']),
  }
  }, {})
export default class RedirectBaseOnAuthState extends Component {
  render() {
    if (!this.props.jwt && this.props.location.pathname.indexOf(urls.loginURL) === -1) {
      return <Redirect to={urls.loginURL} />
    }
    if (
      this.props.jwt
      && (
        this.props.location.pathname === '/'
        || this.props.location.pathname.indexOf(urls.loginURL) > -1
      )
    ) {
      return <Redirect to={urls.contractListURL} />
    }
    return null
  }
}
