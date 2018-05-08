import React, { Component } from 'react'

class Header extends Component {
  constructor() {
    super()

    this.state = {
      // absolute: null,
      // alpha: null,
      // beta: null,
      // gamma: null,
      acceleration: {},
      accelerationIncludingGravity: {},
      rotationRate: {},
      interval: null,
    }
  }

  componentWillMount() {
    window.addEventListener('deviceorientation', (event) => {
      let absolute = event.absolute
      let alpha = event.alpha
      let beta = event.beta
      let gamma = event.gamma

      // Do stuff with the new orientation data
      // this.setState({
      //   absolute,
      //   alpha,
      //   beta,
      //   gamma,
      // })
    }, false)
    window.addEventListener('devicemotion', (event) => {
      let acceleration = event.acceleration
      let accelerationIncludingGravity = event.accelerationIncludingGravity
      let rotationRate = event.rotationRate
      let interval = event.interval

      // Do stuff with the new orientation data
      this.setState({
        acceleration,
        accelerationIncludingGravity,
        rotationRate,
        interval,
      })
    })

    let degtorad = Math.PI / 180 // Degree-to-Radian conversion

    const getQuaternion = ( alpha, beta, gamma ) => {
      let _x = beta ? beta * degtorad : 0 // beta value
      let _y = gamma ? gamma * degtorad : 0 // gamma value
      let _z = alpha ? alpha * degtorad : 0 // alpha value

      let cX = Math.cos( _x / 2 )
      let cY = Math.cos( _y / 2 )
      let cZ = Math.cos( _z / 2 )
      let sX = Math.sin( _x / 2 )
      let sY = Math.sin( _y / 2 )
      let sZ = Math.sin( _z / 2 )

  //
  // ZXY quaternion construction.
  //

      let w = cX * cY * cZ - sX * sY * sZ
      let x = sX * cY * cZ - cX * sY * sZ
      let y = cX * sY * cZ + sX * cY * sZ
      let z = cX * cY * sZ + sX * sY * cZ

      return [ w, x, y, z ]
    }
  }

  render() {
    return <div>
      <h1>DeviceOrientationEvent {window.DeviceOrientationEvent ? 'support' : 'no'}</h1>
      <h1>{this.state.absolute}</h1>
      <h1>{this.state.alpha}</h1>
      <h1>{this.state.beta}</h1>
      <h1>{this.state.gamma}</h1>
      <h1>DeviceMotionEvent {window.DeviceMotionEvent ? 'support' : 'no'}</h1>
      <p>{this.state.acceleration.x * 100}</p>
      <p>{this.state.acceleration.y * 100}</p>
      <p>{this.state.acceleration.z * 100}</p>
      <h1>{JSON.stringify(this.state.accelerationIncludingGravity)}</h1>
      <h1>{JSON.stringify(this.state.rotationRate)}</h1>
      <h1>{this.state.interval}</h1>
    </div>
  }
}

export default Header
