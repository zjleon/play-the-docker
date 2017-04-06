let W3CWebSocket = require('websocket').w3cwebsocket
let tvClient = new W3CWebSocket(process.env.WS_ENDPOINT, 'echo-protocol')
console.log('ws initialized')

// tvClient.onopen = function() {
//   console.log('phone connected to ws server')
//   // const sendNumber = () => {
//   //   if (tvClient.readyState === tvClient.OPEN) {
//   //     let test = {
//   //       phone: {
//   //         action: 'initializeDirection',
//   //         movements: {
//   //           towardNorth: true,
//   //           towardEast: true,
//   //           distance: 10,
//   //         },
//   //       },
//   //     }
//   //     let test2 = {
//   //       tv: {
//   //         action: 'phoneMove',
//   //         movements: {
//   //           towardNorth: true,
//   //           towardEast: true,
//   //           distance: 10,
//   //         },
//   //       },
//   //     }
//   //     if (initialized) {
//   //       tvClient.send(JSON.stringify(test2))
//   //     } else {
//   //       initialized = true
//   //       tvClient.send(JSON.stringify(test))
//   //     }
//   //     setTimeout(sendNumber, 500)
//   //   }
//   // }
//   // sendNumber()
// }

tvClient.onmessage = function(e) {
  console.log("phone Received: '" + JSON.stringify(e.data) + "'")
}

tvClient.onerror = function() {
  console.log('Connection Error')
}

tvClient.onclose = function() {
  console.log('echo-protocol Client Closed')
}

export default tvClient
