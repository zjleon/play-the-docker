// @flow
import React, { Component } from 'react'

import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import {
  Link,
} from 'react-router-dom'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'

type Props = {
  dispatch: Dispatch<any>,
  classes: any,
}
type States = {
  +username: string,
}

class Login extends Component<void, Props, States> {
  state = {
    username: '',
  }

  constructor() {
    super()
  }

  componentDidMount() {
  }

  onClickButton() {
    // this.props.dispatch({
    //   type: 'CHANGE_QUATERNION',
    //   quaternion: 123,
    // })
    console.log(this.props)
    this.props.history.push('/home')
  }

  render() {
    const classes = this.props.classes
    return (
      <Grid className={classes.container} container>
        <Grid item xs={12}>
          <form noValidate>
            <TextField
              id="username"
              label="username"
              className={classes.textField}
              value={this.state.username}
              // $FlowFixMe
              onChange={(event: Event) => this.setState({ username: event.target.value })}
              margin="normal"
            />
          </form>
          <Button color="primary" onTouchTap={this.onClickButton.bind(this)}>
            Login
          </Button>
        </Grid>
      </Grid>
    )
  }
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: 20,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
})

const enhance = compose(
  connect(),
  withStyles(styles),
)

export default enhance(Login)
