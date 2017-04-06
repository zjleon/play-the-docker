import {Image, Surface, Text} from 'ReactCanvas'
import React, { Component } from 'react'

// import ReactCanvas from 'react-canvas'
import position from '../service/Position'
import ws from '../service/WS'

class GameBoard extends Component {
  constructor() {
    super()
  }

  componentWillMount() {
    window.requestAnimFrame = window.requestAnimationFrame ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					window.oRequestAnimationFrame ||
					window.msRequestAnimaitonFrame ||
					function(callback) {window.setTimeout(callback, 1000 / 60)}
  }

  componentDidMount() {
    let canvas = document.getElementById('sig-canvas')
    let ctx = canvas.getContext("2d")
    let positionDiv = document.getElementById('position')

    let path = "./ec3c37ba9594a7b47f1126b2561efd35df2251bfm.jpeg"
    let image1 = new Image(50, 50)
    image1.src = path

    let moveLeft = true

    const drawElement = (element, x, y) => {
    		ctx.drawImage(element, x, y)
   			y += 5
   			if (y > ctx.canvas.height) {
   				y = 0
   			}
   			return {x, y}
   	}

   	const drawHorizon = (element, x, y) => {
    		if (x === 0) {
    			moveLeft = true
    		} else if ((x + element.width) === ctx.canvas.width) {
    			moveLeft = false
    		}
   			if (moveLeft === true) {
   				x += 5
   			} else {
   				x -= 5
   			}
   			ctx.drawImage(element, x, y)

   			// if (x > ctx.canvas.width) {
   			// 	x = 0;
   			// }
   			return {x, y}
   	}
  }

  render() {
    let surfaceWidth = window.innerWidth
    let surfaceHeight = window.innerHeight
    // let imageStyle = this.getImageStyle()
    // let textStyle = this.getTextStyle()

    return <div style={styles.container}>
      <canvas ref="sig-canvas" id="sig-canvas" width={surfaceWidth} height={surfaceHeight}></canvas>
    </div>
  }
}

const styles = {
  container: {
    margin: 20,
  },
}

export default GameBoard
