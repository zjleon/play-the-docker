// @flow
import React, { Component } from 'react'

import type {Dispatch} from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import store from '../redux/store'

let send: number = 0
type Props = {
  dispatch: Dispatch<{type: string }>
}
type States = {
  +interval: number,
}

class Home extends Component<void, Props, States> {
  render() {
    return <div style={styles.container}>
      welcome, {this.props.user.username}
    </div>
  }
}

const styles = {
  container: {
    margin: 20,
  },
}

export default connect((state) => ({
  user: state.user,
}))(Home)
