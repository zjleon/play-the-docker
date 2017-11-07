import React, { Component } from 'react'

import ImageInfo from '../common/ImageInfo.json'

class ImageContainer extends Component {
  state = {
    src: '',
    aspect: 0,
  }

  static screen = {
    width: window.screen.availWidth,
    height: window.screen.availHeight,
    devicePixelRatio: window.devicePixelRatio,
  }

  componentWillMount() {
    // props.useOriginal = true, load the original image
    const src = this.props.useOriginal ?
      ImageInfo[this.props.name] :
      ImageInfo[this.props.name + '@' + this.screen.width]
    let image = new Image()
    image.onload = () => {
      console.log(this)
      this.setState({src})
    }
    image.src = src
  }

  render() {
    const {src, aspect, style, ...props} = this.props
    console.log('ImageContainer', this.screen, this.props)
    return <div style={{...styles.container, paddingBottom: this.state.aspect}}>
      <img style={{...styles.image, ...style}} src={this.state.src} {...props} />
    </div>
  }
}

const styles = {
  container: {
    width: '100%',
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
