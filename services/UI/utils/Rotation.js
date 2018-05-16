let degtorad = Math.PI / 180 // Degree-to-Radian conversion

function getQuaternion( alpha, beta, gamma ) {
  let _x = beta ? beta * degtorad : 0 // beta value
  let _y = gamma ? gamma * degtorad : 0 // gamma value
  let _z = alpha ? alpha * degtorad : 0 // alpha value

  let cX = Math.cos( _x / 2 )
  let cY = Math.cos( _y / 2 )
  let cZ = Math.cos( _z / 2 )
  let sX = Math.sin( _x / 2 )
  let sY = Math.sin( _y / 2 )
  let sZ = Math.sin( _z / 2 )

  //
  // ZXY quaternion construction.
  //

  let w = cX * cY * cZ - sX * sY * sZ
  let x = sX * cY * cZ - cX * sY * sZ
  let y = cX * sY * cZ + sX * cY * sZ
  let z = cX * cY * sZ + sX * sY * cZ

  return [ w, x, y, z ]
}
