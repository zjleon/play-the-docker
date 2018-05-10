const {resolve} = require('path')
const {readdirSync, createWriteStream, watch} = require('fs')

const projectRoot = resolve(__dirname, '../../')
const modulePath = resolve(projectRoot, './modules')
const routeFilePath = resolve(modulePath, './Routers/routes.js')
// const routeFileTemplate =
const exculdedModuleNames = [
  'Common',
  'Routers',
].concat('|')
const warningMessage = '// Don\'t modify this file\n// This file is auto generated by gulp task "watchComponentsAndGenerateRouters"\n'

function getComponentsFromDirectory() {
  const dirsArray = readdirSync(modulePath)
  return dirsArray.filter((dirname) => {
    return exculdedModuleNames.indexOf(dirname) === -1
  })
}

function watchComponents() {
  return watch(
    modulePath,
    {read: false},
    (event, filename) => {
      generateRouters()
    }
  )
}

function generateRouters(done) {
  const dirs = '\'' + getComponentsFromDirectory().join('\', \'') + '\''
  let stream = createWriteStream(routeFilePath)
  if (done) {
    stream.on('close', () => done())
  }
  stream.write(warningMessage)
  stream.write('export default [')
  stream.write(dirs + '')
  stream.end(']\n')
  console.log('Router file updated')
}

module.exports = {
  watchComponents,
  generateRouters,
}
