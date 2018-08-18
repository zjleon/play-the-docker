let server = require('./server')
let ds = server.dataSources.webDB
let lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role']
ds.automigrate(lbTables, function(er) {
  if (er) throw er
  console.log('Loopback tables [' - lbTables - '] created in ', ds.adapter.name)
  ds.disconnect()
})
