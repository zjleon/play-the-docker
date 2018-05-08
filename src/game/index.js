import * as THREE from 'three'

// import clone from 'clone'

let malletProps = {
  startDegree: 90,
  endDegree: 180,
  goingDown: true,
  currentDegree: 90,
  // the direction vector represent the move direction of mallet from start to end
  direction: new THREE.Vector3(-1, -1, 0),
  startPosition: new THREE.Vector3(40, 40, 0),
  endPosition: new THREE.Vector3(15, 10, 0),
}
const MAX_POINTS = 500

let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
camera.position.set(0, 10, 200)
// camera.lookAt(new THREE.Vector3(0, 0, 0))

let renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight )
renderer.setClearColor( 0xfff6e6 )
document.body.appendChild( renderer.domElement )

// create the mole object
let moleTexture = new THREE.TextureLoader().load( 'textures/mole.png' )
let moleMaterial = new THREE.SpriteMaterial( { map: moleTexture } )
let mole = new THREE.Sprite( moleMaterial )
let moleMatrix = new THREE.Matrix4()
let moleMatrixPoisition = new THREE.Vector3(0, 0, 0)
let moleMatrixQuaternion = new THREE.Quaternion()
let moleMatrixScale = new THREE.Vector3(30, 30, 1)
moleMatrix.compose(moleMatrixPoisition, moleMatrixQuaternion, moleMatrixScale)
mole.applyMatrix(moleMatrix)

// @@ angle is in degree, 50 means 50 degree
const perDegree = Math.PI / 180
const angleRange = Math.abs(malletProps.endDegree - malletProps.startDegree)
const movementRange = {
  x: Math.abs(malletProps.endPosition.x - malletProps.startPosition.x),
  y: Math.abs(malletProps.endPosition.y - malletProps.startPosition.y),
  z: Math.abs(malletProps.endPosition.z - malletProps.startPosition.z),
}
// TODO: set by phone's quaternion
const setMalletStateByAngle = (angle) => {
  let positionPercentage = Math.abs(malletProps.startDegree - angle) / angleRange
  let targetQuaternion = mallet.getWorldQuaternion()
  targetQuaternion.setFromAxisAngle( new THREE.Vector3( 0, 0, 1 ), THREE.Math.degToRad(angle) )
  let targetPosition = new THREE.Vector3(
    malletProps.startPosition.x + malletProps.direction.x * positionPercentage * movementRange.x,
    malletProps.startPosition.y + malletProps.direction.y * positionPercentage * movementRange.y,
    malletProps.startPosition.z + malletProps.direction.z * positionPercentage * movementRange.z
  )
  // console.log(targetPosition)

  mallet.matrix.makeRotationFromQuaternion(targetQuaternion)
  mallet.matrix.setPosition(targetPosition)
}
let malletTexture = new THREE.TextureLoader().load( 'textures/mallet.png' )
let malletGeometry = new THREE.PlaneGeometry( 15, 10 )
let mallet = new THREE.Mesh(
  malletGeometry,
  new THREE.MeshBasicMaterial( { map: malletTexture, transparent: true, } )
)
mallet.matrixAutoUpdate = false
setMalletStateByAngle(malletProps.startDegree)

// create rotate reference point
let referenceLineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff })
let referenceLineGeometry = new THREE.Geometry()
referenceLineGeometry.vertices.push(new THREE.Vector3(-10, 15, 0))
referenceLineGeometry.vertices.push(new THREE.Vector3(0, 15, 0))
let referenceLine = new THREE.Line(referenceLineGeometry, referenceLineMaterial)
referenceLine.translateX(20)

scene.add( mole, mallet, referenceLine )

const malletAnimate = () => {
  if (malletProps.currentDegree < 180 ) {
    malletProps.currentDegree += 0.5
    setMalletStateByAngle(malletProps.currentDegree)
  }
}

// setInterval(() => {
//   malletAnimate()
// }, 100)

function render() {
  requestAnimationFrame( render )
  renderer.render( scene, camera )
  malletAnimate()
}
render()
