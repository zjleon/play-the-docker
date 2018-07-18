import React, { Component } from 'react'

import Button from '@material-ui/core/Button'
import ImageContainer from '../Shared/ImageContainer'
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

// import {
//   requestSample,
//   updateUserInfo,
// } from '../../configs/actionIndex'


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
})

// @pageWrapper
@connect((state) => {
  return {
  }
  }, {
  })
@withStyles(styles)
class Home extends Component {
  render() {
    const {classes} = this.props
    return <React.Fragment>
      <ImageContainer name="test_jpg"/>
    </React.Fragment>
  }
}

export default Home
