import React, {Component} from 'react'

class Button extends Component {
  render() {
    return (
      <a
        href="#"
        onTouchTap={this.props.onTapButton}
        style={styles.button}
      >
        Login
      </a>
    )
  }
}

let styles = {
  button: {
    textDecoration: 'none',
    color: '#ffffff',
    border: '1px solid #000',
    backgroundColor: 'blue',
    padding: 10,
  }
}

export default Button
