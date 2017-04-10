import React, { Component } from 'react'

import position from '../service/Position'
import ws from '../service/WS'

class GameBoard extends Component {
  constructor() {
    super()
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return <div style={styles.container}>
    </div>
  }
}

const styles = {
  container: {
    margin: 20,
  },
}

export default GameBoard
