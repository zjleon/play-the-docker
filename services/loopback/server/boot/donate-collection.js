module.exports = function(app) {
  // data sources
  let webDB = app.dataSources.webDB // 'name' of your mongo connector, you can find it in datasource.json
  // create collections
  webDB
  webDB.automigrate(['Collection', 'Donator'], function(err) {
    if (err) throw console.error(err)
    let Collection = app.models.Collection
    Collection.create([{
      itemName: 'Mona Lisa',
      createdDate: '1503-1506',
      donator: {
        name: 'jian'
      }
    }, {
      itemName: 'Girl with a Pearl Earring',
      createdDate: '17th-century',
      donator: {
        name: 'jian'
      }
    }], () => {
      console.log('create initial collection success')
    })

    // app.models.Donator.create({
    //   name: 'jian'
    // }, (donatorError, donator) => {
    //   if (donatorError) throw console.error(donatorError)
    //   Collection.create([{
    //     itemName: 'Mona Lisa',
    //     createdDate: '1503-1506',
    //     donator: {
    //       name: 'jian'
    //     }
    //   }, {
    //     itemName: 'Girl with a Pearl Earring',
    //     createdDate: '17th-century',
    //     donator: {
    //       name: 'jian'
    //     }
    //   }], () => {
    //     console.log('create initial collection success')
    //   })
    // })
  })
}
