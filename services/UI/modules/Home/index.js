import React, { Component } from 'react'

import Button from '@material-ui/core/Button'
// import ImageContainer from '../common/ImageContainer'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import {
  requestSample,
} from '../../configs/actionIndex'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
})

// @pageWrapper
@hot(module)
@connect((state) => {
  return {
  home: state.get('home').toJS(),
  }
  }, {
  })
@withStyles(styles)
class Home extends Component {
  render() {
    const {classes} = this.props
    return <React.Fragment>
      <Button className={classes.button}>Defau1lt</Button>
    </React.Fragment>
  }
}

export default Home
