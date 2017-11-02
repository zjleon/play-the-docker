// @flow
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import React, { Component } from 'react'

import type {Dispatch} from 'redux'
import FlatButton from 'material-ui/FlatButton'
import ImageContainer from '../common/ImageContainer'
import ImageInfo from '../common/ImageInfo.json'
import {Map} from 'immutable'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import position from '../service/Position'
import store from '../redux/store'

let send: number = 0
type Props = {
  dispatch: Dispatch<{type: string }>,
  testChanges: {a: number},
  home: Map<*, *>,
  quaternion: Array<number>,
}
type States = {
  +interval: number,
}

class Home extends Component<void, Props, States> {
  state = {
    interval: 0,
  }

  static method1() {
    console.log(1)
  }

  componentDidMount() {
    type Events = {
      absolute: number,
      alpha: number,
      beta: number,
      gamma: number,
    }
    // $FlowFixMe
    document.addEventListener('deviceorientation', (event: Events) => {
      let absolute: number = event.absolute
      let alpha: number = event.alpha
      let beta: number = event.beta
      let gamma: number = event.gamma
      console.log('z:', alpha, ' || x', beta)
      // let data = {
      //   phone: {
      //     action: 'phoneMove',
      //     movements: gamma,
      //   },
      // }
      // ws.send(JSON.stringify(gamma))

      // Do stuff with the new orientation data
      // this.setState({
      //   absolute,
      //   alpha,
      //   beta,
      //   gamma,
      // })
    }, false)
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

  componentUnMount() {

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

  onClickButton() {
    // this.props.dispatch({
    //   type: 'REQUEST_GET',
    //   url: 'aaa'
    // })
    this.props.dispatch({
      type: 'CHANGE_QUATERNION',
      quaternion: ['a', 'b']
    })
    // this.props.dispatch({
    //   type: 'TEST_CHANGES',
    //   data: 'a'
    // })
  }

  render() {
    console.log('render', this.props)
    // will change the store modal
    this.props.testChanges.a = 2
    // won't change the store modal
    this.props.home.set('quaternion', [2])
    return <div style={styles.container}>
      <div>
        Welcome, {this.props.testChanges.a}
        Welcome1, {this.props.quaternion.join(',')}
      </div>
      <div>
        <ImageContainer
          src={ImageInfo.home_mole.path}
          aspect={ImageInfo.home_mole.aspect} />
      </div>
      <button onClick={this.onClickButton.bind(this)}>'aa'</button>
      {/* <CardActions>
        <FlatButton label="ajax" onClick={this.onClickButton.bind(this)} />
      </CardActions> */}
    </div>
  }
}

const styles = {
  container: {
    margin: 20,
  },
}

export default connect((state: {home: Map<*, *>, testChanges: string}) => ({
  home: state.home,
  quaternion: state.home.get('quaternion'),
  testChanges: state.testChanges,
}))(Home)
