// @flow
import React, { Component } from 'react'

import type {Dispatch} from 'redux'
import {
  Link,
} from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import position from '../service/Position'
import store from '../redux/store'

let send: number = 0
type Props = {
  dispatch: Dispatch<{type: string }>
}
type States = {
  +interval: number,
}

class Home extends Component<void, Props, States> {
  state = {
    interval: 0,
  }

  componentDidMount() {
  }

  componentUnMount() {

  }

  onClickButton() {
    this.props.dispatch({
      type: 'SOCKET_SEND_MESSSGE',
      message: 'aaa'
    })
  }

  render() {
    return <div style={styles.container}>
      welcome, username
    </div>
  }
}

const styles = {
  container: {
    margin: 20,
  },
}

export default connect((state: {home: string}) => ({
  home: state.home,
}))(Home)
