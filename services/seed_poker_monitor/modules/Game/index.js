import React, { Component } from 'react'

import Button from '@material-ui/core/Button'
import ImageContainer from '../Shared/ImageContainer'
import TextField from '@material-ui/core/TextField'
import blueGrey from '@material-ui/core/colors/blueGrey'
import { connect } from 'react-redux'
import {
  setModalVisibility,
} from '../../configs/gulpGenerated/actions'
import { withStyles } from '@material-ui/core/styles'
import Dealer from './subComponents/Dealer'
// import {
//   initWebsocketSaga,
// } from '../../shared/request/socketSaga'

const styles = theme => ({
  gameTable: {
    backgroundColor: blueGrey[200],
    height: '100vh',
  },
})

@connect((state) => {
  return {
    players: state.getIn(['game', 'players']),
    cards: state.getIn(['game', 'cards']),
    round: state.getIn(['game', 'round']),
  }
}, {
  setModalVisibility,

})
@withStyles(styles)
class Game extends Component {
  onClickImage = () => {
    this.props.setModalVisibility(true, 'hello world! \n nice to meet you die')
  }

  render() {
    const {classes} = this.props
    return <div className={classes.gameTable}>
      <Dealer />
    </div>
  }
}

export default Game
