import React, { Component } from 'react'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  cardBack: {
    display: 'inline-block',
    padding: theme.spacing.unit * 2,
  },
  cardFront: {
    display: 'inline-block',
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
})

@connect((state) => {
  return {
  }
}, {

})
@withStyles(styles)
class Dealer extends Component {
  render() {
    const {classes} = this.props
    return <Grid container spacing={16}>
      <Grid item xs={6}>
        <Paper className={classes.paper}>
          <Typography variant="h5" component="h3">
            Cards
          </Typography>
          <Paper className={classes.cardBack}></Paper>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.paper}>
          <Typography variant="h5" component="h3">
            Seed Cards
          </Typography>
          <Paper className={classes.cardFront}>1</Paper>
          <Paper className={classes.cardFront}>2</Paper>
          <Paper className={classes.cardFront}>3</Paper>
          <Paper className={classes.cardFront}>4</Paper>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography variant="h5" component="h3">
            Abandomed Cards
          </Typography>
          <Paper className={classes.cardFront}>1</Paper>
          <Paper className={classes.cardFront}>2</Paper>
          <Paper className={classes.cardFront}>3</Paper>
          <Paper className={classes.cardFront}>4</Paper>
        </Paper>
      </Grid>
    </Grid>
  }
}

export default Dealer
