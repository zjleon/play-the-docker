import React, { Component } from 'react'

import { connect } from 'react-redux'
import {routeChanged} from '../../../configs/actionIndex'
import {
  withRouter,
} from 'react-router'

@withRouter
@connect(null, {
  routeChanged,
  })
export default class RouteChanged extends Component {
  componentDidMount() {
    this.props.routeChanged(this.props.history)
  }

  componentDidUpdate() {
    this.props.routeChanged(this.props.history)
  }

  render() {
    return null
  }
}
