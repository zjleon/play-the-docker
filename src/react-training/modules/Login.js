// @flow
import React, { Component } from 'react'

import Button from './Button'
import Grid from 'material-ui/Grid'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'

class Login extends Component {
  onClickLogin(event) {
    this.props.dispatch({
      type: 'USER_SIGN_IN',
      username: this.props.user.username,
    })
  }

  onChangeUsername(event) {
    this.props.dispatch({
      type: 'CHANGE_USERNAME',
      username: event.target.value,
    })
  }

  render() {
    console.log(this.props)
    const classes = this.props.classes
    return (
      <Grid container>
        <Grid item xs={12} lg={12}>
          <TextField
            id="username"
            label="username"
            className={classes.textField}
            value={this.props.user.username}
            onChange={this.onChangeUsername.bind(this)}
            margin="normal"
          />
          <Button
            buttonText={'Login'}
            onTapButton={this.onClickLogin.bind(this)}
           />
          <div>{this.props.user.username}</div>
        </Grid>
      </Grid>
    )
  }
}

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
})

const enhance = compose(
  connect(state => ({
    user: state.user,
  })),
  withStyles(styles),
)

export default enhance(Login)
