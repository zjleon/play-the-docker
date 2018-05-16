// some of those envs will be undefined in browser side,
// check the exported env in webpack.common.js
const envs = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  PROJECT_ID: process.env.PROJECT_ID,
  IMAGE_RESIZE_CONFIG: JSON.parse(process.env.IMAGE_RESIZE_CONFIG),
}

module.exports = envs
