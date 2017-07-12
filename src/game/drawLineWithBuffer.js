import * as THREE from 'three'

const MAX_POINTS = 500

const drawLineWithBuffer = () => {
  // geometry
  let geometry = new THREE.BufferGeometry()

  // attributes
  let positions = new Float32Array( MAX_POINTS * 3 ) // 3 vertices per point
  let x, y, z, index
  x = y = z = index = 0

  for ( let i = 0, l = MAX_POINTS; i < l; i ++ ) {
    positions[ index ++ ] = x
    positions[ index ++ ] = y
    positions[ index ++ ] = z

    x += ( Math.random() - 0.5 ) * 30
    y += ( Math.random() - 0.5 ) * 30
    z += ( Math.random() - 0.5 ) * 30
  }
  geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) )

  // draw range
  let drawCount = 2 // draw the first 2 points, only
  geometry.setDrawRange( 0, drawCount )

  // material
  let material = new THREE.LineBasicMaterial( { color: 0xff0000, linewidth: 2 } )

  // line
  return new THREE.Line( geometry, material )
}

export {drawLineWithBuffer}
