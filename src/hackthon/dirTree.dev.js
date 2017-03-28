const tree = require('tree-directory')
const path = require('path')
const fs = require('fs')

const rootPath = path.resolve(__dirname, '../')
const docPath = path.resolve(rootPath, './docs')
tree(rootPath, ['**/*', '!node_modules', '!node_modules/**/*', '!**/node_modules/**/*']).then(function(res) {
  const writeStream = fs.createWriteStream(docPath + '/project_structure.md')
  writeStream.write(res)
  writeStream.end()
})
