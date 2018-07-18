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
  userInfo: state.get('userInfo').toJS(),
  }
  }, {
  // updateUserInfo,
  // requestSample,
  })
@withStyles(styles)
class Home extends Component {
  onClickSampleRequest() {
    // this.props.requestSample()
  }

  handleChange = name => event => {
    // this.props.updateUserInfo({
    //   [name]: event.target.value,
    // })
  };

  render() {
    console.log(this.props)
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
