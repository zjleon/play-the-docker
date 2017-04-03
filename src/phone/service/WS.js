let W3CWebSocket = require('websocket').w3cwebsocket
let phoneClient = new W3CWebSocket(process.env.WS_ENDPOINT, 'echo-protocol')
// let tvClient = new W3CWebSocket(process.env.WS_ENDPOINT1, 'echo-protocol')
console.log('ws initialized')

// phoneClient.onopen = function() {
//   console.log('phone connected to ws server')
//   // const sendNumber = () => {
//   //   if (phoneClient.readyState === phoneClient.OPEN) {
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
//   //       phoneClient.send(JSON.stringify(test2))
//   //     } else {
//   //       initialized = true
//   //       phoneClient.send(JSON.stringify(test))
//   //     }
//   //     setTimeout(sendNumber, 500)
//   //   }
//   // }
//   // sendNumber()
// }

phoneClient.onmessage = function(e) {
  console.log("phone Received: '" + JSON.stringify(e.data) + "'")
}

phoneClient.onerror = function() {
  console.log('Connection Error')
}

phoneClient.onclose = function() {
  console.log('echo-protocol Client Closed')
}

export default phoneClient
