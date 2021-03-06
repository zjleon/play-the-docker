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
    this.startTimer = this.startTimer.bind(this)
    this.startTimer()
  }

  populateX(acceleration, timeSpent) {
    const length = this.xAxisMovements.push({
      acceleration,
      timeSpent,
    })
    if (length >= this.threshold) {
      return this.calculateX(this.xAxisMovements.splice(0, this.threshold))
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
      return this.calculateY(this.yAxisMovements.splice(0, this.threshold))
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

  // TODO: to be more particular, calculate the movement angle,
  // and current approach will mis-caculated the round-trip distance
  OnTimeout() {
    const maxLength = this.xAxisEndPoint.length <= this.yAxisEndPoint.length ?
      this.xAxisEndPoint.length : this.yAxisEndPoint.length
    if (maxLength > 1) {
      const xAxisEndPoints = this.xAxisEndPoint.splice(0, maxLength)
      const yAxisEndPoints = this.yAxisEndPoint.splice(0, maxLength)
      console.log('xAxisEndPoints', JSON.stringify(xAxisEndPoints))
      console.log('yAxisEndPoints', JSON.stringify(yAxisEndPoints))
      let result = {}
      let direction = xAxisEndPoints.reduce((accumulator, xAxisEndPoint, xIndex) => {
        // TODO: this is where the round-trip distance mis-caculated
        let movement = Math.sqrt(
          Math.pow(xAxisEndPoint.distanceFromCenter, 2)
          + Math.pow(yAxisEndPoints[xIndex].distanceFromCenter, 2)
        )
        accumulator.distance = accumulator.distance + movement
        accumulator.towardEast = accumulator.towardEast + xAxisEndPoint.velocity
        accumulator.towardNorth = accumulator.towardNorth + yAxisEndPoints[xIndex].velocity
        return accumulator
      }, {
        distance: 0,
        towardEast: 0,
        towardNorth: 0,
      })
      result.distance = direction.distance
      result.towardEast = direction.towardEast > 0
      result.towardNorth = direction.towardNorth > 0
      console.log(direction)

      this.xAxisEndPoint.push({
        velocity: xAxisEndPoints[xAxisEndPoints.length - 1].velocity,
        distanceFromCenter: 0,
      })
      this.yAxisEndPoint.push({
        velocity: yAxisEndPoints[yAxisEndPoints.length - 1].velocity,
        distanceFromCenter: 0,
      })
      this.onReachTimer ? this.onReachTimer(result) : null
    }
  }

  startTimer() {
    this.timer = setTimeout(() => {
      this.OnTimeout()
      this.startTimer()
    }, this.timerClock)
  }

  stopTimer() {
    clearTimeout(this.timer)
  }
}

export default PositionService
