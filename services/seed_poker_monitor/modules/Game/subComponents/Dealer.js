import React, { Component } from 'react'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Face from '@material-ui/icons/Face'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  paper: {
    // margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%',
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
  list: {
    width: '100%',
    height: '100%',
    // borderRadio:
    backgroundColor: theme.palette.background.paper,
  },
  fullHeight: {
    height: '100vh',
  },
  halfFullHeight: {
    padding: theme.spacing.unit * 2,
    height: '50vh',
  },
  rightContainer: {
    padding: theme.spacing.unit * 2,
    height: '100vh',
  },
  noPaddingTop: {
    paddingTop: 0,
  },
  noPaddingLeft: {
    paddingLeft: 0,
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
    // return <div></div>
    return <Grid container spacing={0}>
      <Grid item xs={6}>
        <Grid container>
          <Grid item xs={6} className={classes.halfFullHeight}>
            <Paper className={[classes.paper]}>
              <Typography variant="h5" component="h3">
                Cards
              </Typography>
              <Paper className={classes.cardBack}></Paper>
            </Paper>
          </Grid>
          <Grid item xs={6} className={[classes.halfFullHeight, classes.noPaddingLeft]}>
            <Paper className={[classes.paper]}>
              <Typography variant="h5" component="h3">
              Seed Cards
              </Typography>
              <Paper className={classes.cardFront}>1</Paper>
              <Paper className={classes.cardFront}>2</Paper>
              <Paper className={classes.cardFront}>3</Paper>
              <Paper className={classes.cardFront}>4</Paper>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12} className={[classes.halfFullHeight, classes.noPaddingTop]}>
          <Paper className={[classes.paper]}>
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
      <Grid item xs={6}>
        <Grid item className={[classes.rightContainer, classes.noPaddingLeft]}>
          <Paper className={[classes.paper]}>
            <List className={classes.list}>
              <ListItem>
                <Avatar>
                  <Face />
                </Avatar>
                <ListItemText primary="Photos" secondary="Jan 9, 2014" />
              </ListItem>
              <ListItem>
                <Avatar>
                  <Face />
                </Avatar>
                <ListItemText primary="Work" secondary="Jan 7, 2014" />
              </ListItem>
              <ListItem>
                <Avatar>
                  <Face />
                </Avatar>
                <ListItemText primary="Vacation" secondary="July 20, 2014" />
              </ListItem>
              <ListItem>
                <Avatar>
                  <Face />
                </Avatar>
                <ListItemText primary="Photos" secondary="Jan 9, 2014" />
              </ListItem>
              <ListItem>
                <Avatar>
                  <Face />
                </Avatar>
                <ListItemText primary="Work" secondary="Jan 7, 2014" />
              </ListItem>
              <ListItem>
                <Avatar>
                  <Face />
                </Avatar>
                <ListItemText primary="Vacation" secondary="July 20, 2014" />
              </ListItem>
              <ListItem>
                <Avatar>
                  <Face />
                </Avatar>
                <ListItemText primary="Vacation" secondary="July 20, 2014" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>

    </Grid>
  }
}

export default Dealer
