let server = require('../server')
let ds = server.dataSources.mysql
let lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role']
ds.autoupdate(lbTables, function(er) {
  if (er) throw er
  console.log('Loopback tables [' - lbTables - '] created in ', ds.adapter.name)
  ds.disconnect()
})
