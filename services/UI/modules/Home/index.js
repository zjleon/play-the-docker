import React, { Component } from 'react'

import Button from '@material-ui/core/Button'
// import ImageContainer from '../common/ImageContainer'
import { connect } from 'react-redux'
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
@connect((state) => {
  return {
  home: state.get('home').toJS(),
  }
  }, {
  uploadUniverse,
  })
@withStyles(styles)
class Home extends Component {
  render() {
    return <div style={styles.container}>
      <Button className={classes.button}>Default</Button>
    </div>
  }
}

export default Home
