import messageTypes from './gulpGenerated/messageTypes'

if (!messageTypes) {
  throw new Error('use gulp to start')
}

export {
  messageTypes,
}
