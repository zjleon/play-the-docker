module.exports = function(app) {
  // data sources
  let webDB = app.dataSources.webDB // 'name' of your mongo connector, you can find it in datasource.json
  // create all models
  let lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role']
  webDB.automigrate(lbTables, function(er) {
    if (er) throw console.error()
    console.log('Loopback tables [' - lbTables - '] created in ', webDB.adapter.name)
  })
}
