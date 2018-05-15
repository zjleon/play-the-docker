import React, { Component } from 'react'

import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'

class Loading extends Component {
  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        <CircularProgress size={50} />
      </React.Fragment>
    )
  }
}

export default Loading
