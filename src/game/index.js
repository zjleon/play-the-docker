import * as THREE from 'three'

// import {camera, renderer, scene} from './sceneAndCamera'

// import {drawLineWithBuffer} from './drawLineWithBuffer'


const MAX_POINTS = 500

let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
camera.position.set(0, 0, 50)
// camera.lookAt(new THREE.Vector3(0, 0, 0))

let renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight )
renderer.setClearColor( 0xfff6e6 )
document.body.appendChild( renderer.domElement )

// craete the mole object
let geometry = new THREE.PlaneGeometry( 20, 20 )
let material = new THREE.MeshBasicMaterial( {color: 0xff0000, side: THREE.DoubleSide} )
let plane = new THREE.Mesh( geometry, material )
let spriteMap = new THREE.TextureLoader().load( 'textures/mole.png' )
let spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap } )
let sprite = new THREE.Sprite( spriteMaterial )
plane.rotateX(Math.PI / 4)
plane.rotateY(Math.PI / 6)
let matrix = new THREE.Matrix4()
// matrix.set(50, 1, 1, 1,
//            1, 10, 1, 1,
//            50, 1, 1, 1,
//            1, 1, 1, 1)
let matrixPoisition = new THREE.Vector3(20, 0, 0)
let matrixQuaternion = new THREE.Quaternion()
let matrixScale = new THREE.Vector3(10, 10, 1)
matrix.compose(matrixPoisition, matrixQuaternion, matrixScale)
// matrix.decompose(matrixPoisition, matrixQuaternion, matrixScale)
console.log(matrixPoisition, matrixQuaternion, matrixScale)
console.log(matrix)
sprite.applyMatrix(matrix)
// sprite.translateX(20)
plane.getWorldQuaternion(sprite.quaternion)
scene.add( plane, sprite )

function render() {
  requestAnimationFrame( render )
  renderer.render( scene, camera )
  // const drawCount1 = line.geometry.drawRange.count + 1
  // const drawCount = line.geometry.drawRange.count
  // const drawStart = line.geometry.drawRange.start + drawCount
  // line.geometry.setDrawRange( 0, drawCount1 )
}
render()
