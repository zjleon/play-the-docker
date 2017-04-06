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
    // window.addEventListener('deviceorientation', (event) => {
    //   let absolute = event.absolute
    //   let alpha = event.alpha
    //   let beta = event.beta
    //   let gamma = event.gamma
    //
    //   // Do stuff with the new orientation data
    //   this.setState({
    //     absolute,
    //     alpha,
    //     beta,
    //     gamma,
    //   })
    // }, false)
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
