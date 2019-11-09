import React, { Component } from 'react'

// import Header from './subComponents/Header'
import SingleButtonModal from './subComponents/SingleButtonModal'
import history from '../../shared/history'
import CssBaseline from '@material-ui/core/CssBaseline'

export default (ChildComponent) => {
  return class Layout extends Component {
    shouldLayoutRender() {
      const {location} = history
      const exclusiveList = [
        'Authentication'
      ]
      return exclusiveList.find((item) => location.pathname.indexOf(item) > -1)
    }

    render() {
      return this.shouldLayoutRender() ?
        <div>
          <CssBaseline />
          <ChildComponent />
        </div>
        :
        <div>
          <CssBaseline />
          {/* <Header /> */}
          <ChildComponent />
          {/* <SingleButtonModal /> */}
        </div>
    }
  }
}
