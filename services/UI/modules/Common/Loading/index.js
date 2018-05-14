import React, { Component } from 'react'

import { CircularProgress } from 'material-ui/Progress'
import { withStyles } from 'material-ui/styles'

class Loading extends Component {
  render() {
    const { classes } = this.props
    return (
    <div>
      <CircularProgress size={50} />
    </div>
    )
  }
}

export default Loading
