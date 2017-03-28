import clone from 'clone'

class PositionService {
  constructor(props) {
    this.xAxisMovements = [
      // {
      //   acceleration: 0,
      //   timeSpent: 0,
      // }
    ]
    this.xAxisEndPoint = [
      {
        velocity: 0,
        distanceFromCenter: 0,
      }
    ]
    this.yAxisMovements = [
      // {
      //   acceleration: 0,
      //   timeSpent: 0,
      // }
    ]
    this.yAxisEndPoint = [
      {
        velocity: 0,
        distanceFromCenter: 0,
      }
    ]
    this.threshold = props.threshold || 99
    this.onReachTimer = props.onReachTimer || null
    this.timerClock = props.timerClock || 500
    this.timer = null
  }

  populateX(acceleration, timeSpent) {
    const length = this.xAxisMovements.push({
      acceleration,
      timeSpent,
    })
    if (length >= this.threshold) {
      return this.calculateX(this.xAxisMovements.slice(0, this.threshold))
    }
    return null
  }

  calculateX(axisMovements) {
    let {velocity, distanceFromCenter} = this.xAxisEndPoint[this.xAxisEndPoint.length - 1]
    let endPosition = axisMovements.reduce((accumulator, axisMovement) => {
      const currentVelocity = accumulator.velocity + axisMovement.acceleration * axisMovement.timeSpent
      accumulator.distanceFromCenter = accumulator.distanceFromCenter + (currentVelocity + accumulator.velocity) * axisMovement.timeSpent
      accumulator.velocity = currentVelocity
      return accumulator
    }, {
      velocity,
      distanceFromCenter,
    })
    this.xAxisEndPoint.push(endPosition)
    return endPosition.distanceFromCenter
  }

  populateY(acceleration, timeSpent) {
    const length = this.yAxisMovements.push({
      acceleration,
      timeSpent,
    })
    if (length >= this.threshold) {
      return this.calculateY(this.yAxisMovements.slice(0, this.threshold))
    }
    return null
  }

  calculateY(axisMovements) {
    let {velocity, distanceFromCenter} = this.yAxisEndPoint[this.yAxisEndPoint.length - 1]
    let endPosition = axisMovements.reduce((accumulator, axisMovement) => {
      const currentVelocity = accumulator.velocity + axisMovement.acceleration * axisMovement.timeSpent
      accumulator.distanceFromCenter = accumulator.distanceFromCenter + (currentVelocity + accumulator.velocity) * axisMovement.timeSpent
      accumulator.velocity = currentVelocity
      return accumulator
    }, {
      velocity,
      distanceFromCenter,
    })
    this.yAxisEndPoint.push(endPosition)
    return endPosition.distanceFromCenter
  }

  OnTimeout() {
    const maxLength = this.xAxisEndPoint.length <= this.yAxisEndPoint.length ?
      this.xAxisEndPoint.length : this.yAxisEndPoint.length
    const xAxisEndPoints = this.xAxisEndPoint.slice(0, maxLength)
    const yAxisEndPoints = this.yAxisEndPoint.slice(0, maxLength)
    Math.sqrt(Math.pow(xAxisEndPoints, 2) + Math.pow(yAxisEndPoints, 2))
    // TODO: pow will lose direction
    // const endpoint = xAxisEndPoints.reduce((accumulator, xAxisEndPoint) => {
    //   return accumulator +
    // }, 0)
    this.onReachTimer ? this.onReachTimer() : null
  }

  startTimer() {
    this.timer = setTimeout(() => this.OnTimeout)
  }

  stopTimer() {
    clearTimeout(this.timer)
  }
}

export default PositionService
