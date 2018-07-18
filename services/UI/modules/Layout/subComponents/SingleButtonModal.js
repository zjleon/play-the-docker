import React, { Component } from 'react'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import { connect } from 'react-redux'
import {setModalVisibility} from '../../../configs/gulpGenerated/actions'
import { withStyles } from '@material-ui/core/styles'

function Transition(props) {
  return <Slide direction="up" {...props} />
}

const styles = theme => ({
  lines: {
    display: 'block',
  },
})

@connect((state) => {
  return {
  singleButtonModal: state.getIn(['layout', 'singleButtonModal']).toJS(),
  }
  }, {
  setModalVisibility
  })
@withStyles(styles)
export default class SingleButtonModal extends Component {
  handleClickOpen = () => {
    this.props.setModalVisibility(true)
  };

  handleClose = () => {
    this.props.setModalVisibility(false)
  };

  render() {
    const {singleButtonModal, classes} = this.props
    let content = singleButtonModal.content.split('/n')
    content = content.map((line, index) => {
      return <DialogContentText
        key={`messageContent-${index}`}
        classes={{root: classes.lines}}
      >{line}</DialogContentText>
    })
    return <Dialog
      open={singleButtonModal.visible}
      TransitionComponent={Transition}
      onClose={this.handleClose}
    >
      <DialogTitle>{singleButtonModal.title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={this.handleClose} color="primary">
              OK
        </Button>
      </DialogActions>
    </Dialog>
  }
}
