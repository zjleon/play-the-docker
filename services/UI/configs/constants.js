// some of those envs will be undefined in browser side,
// check the exported env in webpack.common.js
const envs = {
  PORT: process.env.PORT,
  PROJECT_ID: process.env.PROJECT_ID,
  IMAGE_RESIZE_CONFIG: process.env.IMAGE_RESIZE_CONFIG,
}

module.exports = envs
