import React, { Component } from 'react'

import Button from '@material-ui/core/Button'
import ImageContainer from '../Shared/ImageContainer'
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux'
import {
  updateUserInfo,
} from '../../configs/gulpGenerated/actions'
import {urls} from '../../configs/constants'
import { withStyles } from '@material-ui/core/styles'

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
  userInfo: state.get('authentication').toJS(),
  }
  }, {
  updateUserInfo,
  })
@withStyles(styles)
export default class Authentication extends Component {
  // constructor() {
  //   super()
  //
  //   this.onClickLogin = () => {this.onClickLogin()}
  // }

  onClickLogin = () => {
    this.props.updateUserInfo({'jwt': 'auth'})
    this.props.history.push(urls.authenticatedPage)
  }

  handleChange = name => event => {
    this.props.updateUserInfo({[name]: event.target.value})
  };

  render() {
    console.log(this.props)
    const {classes, userInfo} = this.props
    return <React.Fragment>
      <TextField
        required
        id="name"
        label="Name"
        className={classes.textField}
        value={userInfo.name}
        onChange={this.handleChange('name')}
        margin="normal"
      />
      <Button className={classes.button} onClick={this.onClickLogin}>Login</Button>
    </React.Fragment>
  }
}
