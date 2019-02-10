import React, { Component } from 'react'

import ImageInfo from '../../../configs/gulpGenerated/imageInfo.json'
import {envs} from '../../../configs/constants'

const targetWidth = (function() {
  const availWidth = window.screen.availWidth * window.devicePixelRatio
  return envs.IMAGE_RESIZE_CONFIG.find((deviceWidth, index, deviceWidthArray) => {
    // get the most suitable resolution
    // or return the lastest one when no one match
    return availWidth <= deviceWidth ||
      (index + 1) === deviceWidthArray.length
  })
})()

// props:
//    name: image name(without path)
//    style: styles apply to <img />
class ImageContainer extends Component {
  state = {
    src: '',
    aspect: 0,
  }
  constructor() {
    super()
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
    // TODO: handle the image load error
    image.onload = () => {
      this.setState({src})
    }
    image.src = src
  }

  // componentWillMount() {
  //   // props.useOriginal = true, load the original image
  //   const imageName = this.props.name.replace('.', '_')
  //   let imageInfo = this.props.useOriginal ?
  //     ImageInfo[imageName] :
  //     ImageInfo[imageName + '@' + targetWidth]
  //   if (!imageInfo) {
  //     console.error(`${imageName} or ${imageName}@${targetWidth} is not exist`)
  //     imageInfo = {}
  //   }
  //   this.setState({aspect: imageInfo.aspect})
  //   const src = imageInfo.path
  //   let image = new Image()
  //   // TODO: handle the image load error
  //   image.onload = () => {
  //     this.setState({src})
  //   }
  //   image.src = src
  // }

  render() {
    const {src, style, ...props} = this.props
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
