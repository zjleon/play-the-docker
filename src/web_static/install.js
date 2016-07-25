const childProcess = require('child_process')

const result = childProcess.execSync('node install')

console.log(result)
