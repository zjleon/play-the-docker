import EventManager from './GeneralControl/eventManager'
import axios from 'axios'
import {client} from 'websocket'

exports.querySeats = function() {
  return axios(process.env.HTTP_ENDPOINT + '/getRemainingSeats').then(response => {
    console.log(11, response.data)
    return response.data
  })
}

exports.join = function() {
  const c = new client()

  c.connect(process.env.WS_ENDPOINT + '/game')
  return c
}
