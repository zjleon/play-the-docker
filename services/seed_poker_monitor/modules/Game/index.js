import React, { Component } from 'react'

import Button from '@material-ui/core/Button'
import ImageContainer from '../Shared/ImageContainer'
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux'
import {
  setModalVisibility,
} from '../../configs/gulpGenerated/actions'
import { withStyles } from '@material-ui/core/styles'
// import {
//   senderSaga,
//   receiverSaga,
// } from '../../shared/request/socketSaga'

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

@connect((state) => {
  return {
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
    return <div>
      <div>
        pokers
      </div>
    </div>
  }
}

export default Game
