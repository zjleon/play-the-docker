import React, { Component } from 'react'

import Header from './Header'
import history from '../../shared/history'

export default (ChildComponent) => {
  return class Layout extends Component {
    shouldLayoutRender() {
      const {location} = history
      const exclusiveList = [
        'Authentication'
      ]
      return exclusiveList.find((item) => location.pathname.indexOf(item))
    }

    render() {
      return this.shouldLayoutRender() ?
        <ChildComponent />
        :
        <div>
          <Header />
          <ChildComponent />
        </div>
    }
  }
}
