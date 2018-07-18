import React, { Component } from 'react'

import Header from './Header'
import history from '../../shared/history'

export default (ChildComponent) => {
  return class Layout extends Component {
    shouldLayoutRender() {
      const {location} = history
      console.log(history)
      const exclusiveList = [
        'Authentication'
      ]
      return exclusiveList.find((item) => location.pathname.indexOf(item))
    }

    render() {
      console.log('render PageWrapper')
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
