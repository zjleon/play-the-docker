const { spawn } = require('child_process')
const {resolve} = require('path')
const mochaPath = resolve(__dirname, '../../', 'node_modules/mocha/bin/mocha')

function runTests(done) {
  const childProcess = spawn('node', [mochaPath], {
    env: process.env,
    cwd: resolve(__dirname, '../../')
  })

  childProcess.stdout.on('data', (data) => {
    console.log(`${data}`)
  })

  childProcess.stderr.on('data', (data) => {
    console.log(`${data}`)
  })

  childProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`)
    done()
  })
}

module.exports = {
  runTests,
}
