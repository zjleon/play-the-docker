import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import React, { Component } from 'react'

import FlatButton from 'material-ui/FlatButton'
import {
  Link,
} from 'react-router-dom'
// import position from '../service/Position'
import ws from '../service/WS'

let send = 0
class Calibration extends Component {
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

    // this.positionService = new position({
    //   threshold: 5,
    //   onReachTimer: this.onReachTimer.bind(this)
    // })
  }

  componentDidMount() {
    // window.addEventListener('deviceorientation', (event) => {
    //   let absolute = event.absolute
    //   let alpha = event.alpha
    //   let beta = event.beta
    //   let gamma = event.gamma
    //   console.log(gamma)
    //   let data = {
    //     phone: {
    //       action: 'phoneMove',
    //       movements: gamma,
    //     },
    //   }
    //   ws.send(JSON.stringify(gamma))
    //
    //   // Do stuff with the new orientation data
    //   // this.setState({
    //   //   absolute,
    //   //   alpha,
    //   //   beta,
    //   //   gamma,
    //   // })
    // }, false)
    // ws.onmessage = (e) => {
    //   console.log("phone Received: '" + JSON.stringify(e) + "'")
    // }
    // window.addEventListener('devicemotion', (event) => {
    //   let acceleration = event.acceleration
    //   let accelerationIncludingGravity = event.accelerationIncludingGravity
    //   let rotationRate = event.rotationRate
    //   let interval = event.interval
    //
    //   // Do stuff with the new orientation data
    //   if (rotationRate.alpha > 0.1) {
    //     console.log('rotationRate alpha:', rotationRate.alpha, interval / 1000)
    //     console.log('rotationRate beta:', rotationRate.beta, interval / 1000)
    //     console.log('rotationRate gamma:', rotationRate.gamma, interval / 1000)
    //   }
    //   // if (send < 10) {
    //   //   if (acceleration.x > 0.6 || acceleration.y > 0.6) {
    //   //     // console.log('devicemotion x:', acceleration.x, interval / 1000)
    //   //     this.positionService.populateX(acceleration.x, interval / 1000)
    //   //     // console.log('devicemotion y:', acceleration.y)
    //   //     // console.log('devicemotion z:', acceleration.z)
    //   //     this.positionService.populateY(acceleration.y, interval / 1000)
    //   //   }
    //   // }
    // })
  }

  // onReachTimer(movement) {
  //   if (send < 10) {
  //     let data = {
  //       phone: {
  //         action: 'initializeDirection',
  //         movements: movement,
  //       },
  //     }
  //     ws.send(JSON.stringify(data))
  //     send = send + 1
  //   }
  // }

  render() {
    console.log(this.props)
    return <div style={styles.container}>
      <Card>
        <CardHeader
          title="Calibrate your phone"
        />
        <CardText>
          1. First move your phone to the left.
        </CardText>
        <CardText>
          2. Then move your phone back to the center.
        </CardText>
        <CardText>
          3. Hit 'finish' button.
        </CardText>
        <CardActions>
          <Link to={`/calibration`}>
            Rendering with React23
          </Link>
          <FlatButton label="Finish" />
        </CardActions>
      </Card>
    </div>
  }
}

const styles = {
  container: {
    margin: 20,
  },
}

export default Calibration
