import React, {Component} from 'react'

class Button extends Component {
  state = {
    isMouseOver: false,
  }

  onMouseOver(event) {
    this.setState({isMouseOver: true})
  }
  onMouseLeave(event) {
    this.setState({isMouseOver: false})
  }

  render() {
    return (
      <a
        href="#"
        onTouchTap={this.props.onTapButton}
        onMouseOver={this.onMouseOver.bind(this)}
        onMouseLeave={this.onMouseLeave.bind(this)}
        style={this.state.isMouseOver ? styles.buttonHover : styles.button}
      >
        {this.props.buttonText}
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
  },
  buttonHover: {
    textDecoration: 'none',
    color: 'red',
    border: '1px solid #000',
    backgroundColor: 'blue',
    padding: 10,
  },
}

export default Button
