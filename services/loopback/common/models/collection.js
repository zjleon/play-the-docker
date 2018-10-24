const app = require('../../server/server') // require `server.js` as in any node.js app

module.exports = function(Collection) {
  Collection.disableRemoteMethodByName("upsert") // disables PATCH /Collections
  // Collection.disableRemoteMethodByName("find") // disables GET /Collections
  Collection.disableRemoteMethodByName("replaceOrCreate") // disables PUT /Collections
  // Collection.disableRemoteMethodByName("create") // disables POST /Collections

  Collection.disableRemoteMethodByName("prototype.updateAttributes") // disables PATCH /Collections/{id}
  // Collection.disableRemoteMethodByName("findById") // disables GET /Collections/{id}
  // Collection.disableRemoteMethodByName("exists") // disables HEAD /Collections/{id}
  // Collection.disableRemoteMethodByName("replaceById") // disables PUT /Collections/{id}
  Collection.disableRemoteMethodByName("deleteById") // disables DELETE /Collections/{id}

  Collection.disableRemoteMethodByName('prototype.__get__accessTokens') // disable GET /Collections/{id}/accessTokens
  Collection.disableRemoteMethodByName('prototype.__create__accessTokens') // disable POST /Collections/{id}/accessTokens
  Collection.disableRemoteMethodByName('prototype.__delete__accessTokens') // disable DELETE /Collections/{id}/accessTokens

  Collection.disableRemoteMethodByName('prototype.__findById__accessTokens') // disable GET /Collections/{id}/accessTokens/{fk}
  Collection.disableRemoteMethodByName('prototype.__updateById__accessTokens') // disable PUT /Collections/{id}/accessTokens/{fk}
  Collection.disableRemoteMethodByName('prototype.__destroyById__accessTokens')// disable DELETE /Collections/{id}/accessTokens/{fk}

  Collection.disableRemoteMethodByName('prototype.__count__accessTokens') // disable  GET /Collections/{id}/accessTokens/count

  // Collection.disableRemoteMethodByName("prototype.verify") // disable POST /Collections/{id}/verify
  // Collection.disableRemoteMethodByName("changePassword") // disable POST /Collections/change-password
  Collection.disableRemoteMethodByName("createChangeStream") // disable GET and POST /Collections/change-stream

  Collection.disableRemoteMethodByName("confirm") // disables GET /Collections/confirm
  // Collection.disableRemoteMethodByName("count") // disables GET /Collections/count
  Collection.disableRemoteMethodByName("findOne") // disables GET /Collections/findOne

  // Collection.disableRemoteMethodByName("login");                                // disables POST /Collections/login
  // Collection.disableRemoteMethodByName("logout");                               // disables POST /Collections/logout

  // Collection.disableRemoteMethodByName("resetPassword") // disables POST /Collections/reset
  // Collection.disableRemoteMethodByName("setPassword") // disables POST /Collections/reset-password
  Collection.disableRemoteMethodByName("update") // disables POST /Collections/update
  // Collection.disableRemoteMethodByName("upsertWithWhere") // disables POST /Collections/upsertWithWhere
  // Collection.disableRemoteMethodByName("prototype.__get__donator")

  // Overide default create method
  Collection.on('dataSourceAttached', function(obj) {
    let create = Collection.create
    const relations = Collection.settings.relations
    Collection.create = function(data, options, cb) {
      if (data.length) {
        // if the data is array, the default create will map the array
        // and call this custom function respectively
        return create.call(this, data, options, cb)
      }

      // if the model instance contain data that need to be created in relational tables,
      // create the relational data first, then insert the target model instance
      let containRelationalData = Object.keys(data).reduce((accumulator, relationName) => {
        if (
          typeof data[relationName] === 'object'
            && relations[relationName]
        ) {
          const modelName = relations[relationName].model
          console.log(11, JSON.stringify(relations))
          app.models[modelName].findOrCreate(
            {
              where: {name: data[relationName].name}
            },
            data[relationName],
            (err, instance, created) => {
              if (err) {
                console.error(err)
              }
              data.donatorName = instance.name
              create.call(this, data, options, cb)
            }
          )
          if (!accumulator) {
            return true
          }
        }
        return accumulator
      }, false)
      if (!containRelationalData) {
        return create.call(this, data, options, cb)
      }
      return true
    }
  })
}
