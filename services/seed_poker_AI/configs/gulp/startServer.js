import {resolve} from 'path'
import { spawn } from 'child_process'

const indexScript = resolve(__dirname, '../../index.js')

export function startDevServer(done) {
  const childProcess = spawn('node', [`--inspect=${process.env.DEBUG_PORT}`, indexScript], {
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

export function startProductionServer(done) {
}
