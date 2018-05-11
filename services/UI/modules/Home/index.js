import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import React, { Component } from 'react'

import FlatButton from 'material-ui/FlatButton'
// import ImageContainer from '../common/ImageContainer'
import {Map} from 'immutable'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  requestSample,
} from '../../configs/actionIndex'

// @pageWrapper
@connect((state) => {
  return {
  home: state.get('home').toJS(),
  }
  }, {
  uploadUniverse,
  })
class Home extends Component {
  render() {
    return <div style={styles.container}>
      123
    </div>
  }
}

const styles = {
  container: {
    margin: 20,
  },
}

export default Home
