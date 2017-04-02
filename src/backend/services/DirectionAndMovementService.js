class DirectionAndMovementService {
  constructor() {
    this.left = {
      headNorth: true,
      headEast: false,
    }
    this.movements = []
  }

  initializeDirection(movement) {
    this.movements = []
    this.left.headNorth = movement.towardNorth
    this.left.headEast = movement.towardEast
    console.log(JSON.stringify(this.left))
  }

  // TODO: use angle to detect left and right,
  // e.g: base angle 30 degree, then (30-90, 30+90) means left, other half means right
  getMovement(movement) {
    const isMoveLeft = movement.towardNorth === this.left.headNorth &&
      movement.towardEast === this.left.headEast
    const isMoveRight = movement.towardNorth === !this.left.headNorth &&
      movement.towardEast === !this.left.headEast
    if (isMoveLeft) {
      this.movements.push(-movement.distance)
    }
    if (isMoveRight) {
      this.movements.push(movement.distance)
    }
    console.log(JSON.stringify(this.movements))
    return this.movements.reduce((accumulator, move) => {
      return accumulator + move
    }, 0)
  }

  resetDirection() {
    this.movements = []
  }
}

module.exports = new DirectionAndMovementService()
