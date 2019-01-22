import messageTypes from './gulpGenerated/metaData'

if (!messageTypes) {
  throw new Error('use gulp to start')
}

export {
  messageTypes,
}
