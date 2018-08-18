let async = require('async')
module.exports = function(app) {
  // data sources
  let webDB = app.dataSources.webDB // 'name' of your mongo connector, you can find it in datasource.json
  // create users
  webDB.autoupdate('vip', function(err) {
    if (err) throw console.error(err)
    let User = app.models.vip
    User.create([{
      email: 'foo@bar.com',
      password: 'foobar'
    }, {
      email: 'john@doe.com',
      password: 'johndoe'
    }], () => {
      console.log('create vip success')
    })
  })
}
