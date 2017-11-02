import React, { Component } from 'react'

class ImageContainer extends Component {
  render() {
    const {src, aspect, ...props} = this.props
    return <div style={styles.container}>
      <img style={styles.image} src={this.props.src} {...props} />
    </div>
  }
}

const styles = {
  container: {
    width: '100%',
    paddingBottom: this.props.aspect,
    position: 'relative',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
}

export default ImageContainer
