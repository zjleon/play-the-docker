import React, { Component } from 'react'
import {
  requestSample,
  updateUserInfo,
} from '../../configs/actionIndex'

import Button from '@material-ui/core/Button'
import ImageContainer from '../common/ImageContainer'
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import { withStyles } from '@material-ui/core/styles'

console.log(updateUserInfo)

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
@hot(module)
@connect((state) => {
  return {
  userInfo: state.get('userInfo').toJS(),
  }
  }, {
  updateUserInfo,
  requestSample,
  })
@withStyles(styles)
class Home extends Component {
  onClickSampleRequest() {
    this.props.requestSample()
  }

  handleChange = name => event => {
    this.props.updateUserInfo({
      [name]: event.target.value,
    })
  };

  render() {
    const {classes, userInfo} = this.props
    return <React.Fragment>
      <ImageContainer name="test_jpg"/>
      <TextField
        required
        id="name"
        label="Name"
        className={classes.textField}
        value={userInfo.name}
        onChange={this.handleChange('name')}
        margin="normal"
      />
      <Button className={classes.button} onClick={this.onClickSampleRequest}>Defau1lt</Button>
    </React.Fragment>
  }
}

export default Home
