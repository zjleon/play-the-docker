const messageTypes = require('./gulpGenerated/metaData').default

// some of those envs will be undefined in browser side,
// check the exported env in webpack.common.js
const envs = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  PROJECT_ID: process.env.PROJECT_ID,
  IMAGE_RESIZE_CONFIG: JSON.parse(process.env.IMAGE_RESIZE_CONFIG),
  WS_ENDPOINT: process.env.WS_ENDPOINT,
  HTTP_ENDPOINT: process.env.HTTP_ENDPOINT,
}

// TODO: this should come from loopback swagger file
const urls = {
  sample: '/api/sample',
  unAuthenticatePage: '/Authentication',
  authenticatedPage: '/Home',
  home: '/Home',
  game: '/game',
}

module.exports = {
  envs,
  urls,
  messageTypes,
}
