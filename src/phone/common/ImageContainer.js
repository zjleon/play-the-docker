import React, { Component } from 'react'

import ImageInfo from '../common/ImageInfo.json'

const getResolutionWidth = () => {
  const availWidth = window.screen.availWidth * window.devicePixelRatio
  let targetDeviceWidth
  try {
    targetDeviceWidth = JSON.parse(process.env.IMAGE_RESIZE_CONFIG)
  } catch (e) {
    console.error('missed targetDeviceWidth config in process.env,', e)
    targetDeviceWidth = []
  }
  return targetDeviceWidth.find((deviceWidth) => availWidth <= deviceWidth)
}

const targetWidth = getResolutionWidth()

class ImageContainer extends Component {
  state = {
    src: '',
    aspect: 0,
  }

  componentWillMount() {
    // props.useOriginal = true, load the original image
    const imageName = this.props.name.replace('.', '_')
    let imageInfo = this.props.useOriginal ?
      ImageInfo[imageName] :
      ImageInfo[imageName + '@' + targetWidth]
    if (!imageInfo) {
      console.error(`${imageName} or ${imageName}@${targetWidth} is not exist`)
      imageInfo = {}
    }
    this.setState({aspect: imageInfo.aspect})
    const src = imageInfo.path
    let image = new Image()
    image.onload = () => {
      console.log('onload', this)
      this.setState({src})
    }
    image.src = src
  }

  render() {
    const {src, style, ...props} = this.props
    console.log('ImageContainer', targetWidth, this.props)
    const paddingBottom = this.state.aspect * 100 + '%'
    return <div style={{...styles.container, paddingBottom}}>
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
