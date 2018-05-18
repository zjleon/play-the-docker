// module.exports = function(app) {
//   app.dataSources.mysql.autoupdate('CoffeeShop', function(err) {
//     if (err) throw err
//
//     app.models.CoffeeShop.create([{
//       name: 'Bel Cafe',
//       city: 'Vancouver'
//     }, {
//       name: 'Three Bees Coffee House',
//       city: 'San Mateo'
//     }, {
//       name: 'Caffe Artigiano',
//       city: 'Vancouver'
//     }], function(err, coffeeShops) {
//       if (err) throw err
//
//       console.log('Models created: \n', coffeeShops)
//     })
//   })
// }

let async = require('async')
module.exports = function(app) {
  // let server = require('../server')
  let ds = app.dataSources.mysql
  let lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role']
  ds.autoupdate(lbTables, function(er) {
    if (er) throw er
    console.log('Loopback tables [' - lbTables - '] created in ', ds.adapter.name)
    // ds.disconnect()
  })

  // data sources
  let postgres = app.dataSources.postgres // 'name' of your mongo connector, you can find it in datasource.json
  let mysql = app.dataSources.mysql
  // create all models
  async.parallel({
    reviewers: async.apply(createReviewers),
    coffeeShops: async.apply(createCoffeeShops),
  }, function(err, results) {
    if (err) throw err
    createReviews(results.reviewers, results.coffeeShops, function(err) {
      console.log('> models created sucessfully')
    })
  })
  // create reviewers
  function createReviewers(cb) {
    postgres.automigrate('Reviewer', function(err) {
      if (err) return cb(err)
      let Reviewer = app.models.Reviewer
      Reviewer.create([{
        email: 'foo@bar.com',
        password: 'foobar'
      }, {
        email: 'john@doe.com',
        password: 'johndoe'
      }, {
        email: 'jane@doe.com',
        password: 'janedoe'
      }], cb)
    })
  }
  // create coffee shops
  function createCoffeeShops(cb) {
    mysql.automigrate('CoffeeShop', function(err) {
      if (err) return cb(err)
      let CoffeeShop = app.models.CoffeeShop
      CoffeeShop.create([{
        name: 'Bel Cafe',
        city: 'Vancouver'
      }, {
        name: 'Three Bees Coffee House',
        city: 'San Mateo'
      }, {
        name: 'Caffe Artigiano',
        city: 'Vancouver'
      }, ], cb)
    })
  }
  // create reviews
  function createReviews(reviewers, coffeeShops, cb) {
    postgres.automigrate('Review', function(err) {
      if (err) return cb(err)
      let Review = app.models.Review
      let DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24
      Review.create([{
        date: Date.now() - (DAY_IN_MILLISECONDS * 4),
        rating: 5,
        comments: 'A very good coffee shop.',
        publisherId: reviewers[0].id,
        coffeeShopId: coffeeShops[0].id,
      }, {
        date: Date.now() - (DAY_IN_MILLISECONDS * 3),
        rating: 5,
        comments: 'Quite pleasant.',
        publisherId: reviewers[1].id,
        coffeeShopId: coffeeShops[0].id,
      }, {
        date: Date.now() - (DAY_IN_MILLISECONDS * 2),
        rating: 4,
        comments: 'It was ok.',
        publisherId: reviewers[1].id,
        coffeeShopId: coffeeShops[1].id,
      }, {
        date: Date.now() - (DAY_IN_MILLISECONDS),
        rating: 4,
        comments: 'I go here everyday.',
        publisherId: reviewers[2].id,
        coffeeShopId: coffeeShops[2].id,
      }], cb)
    })
  }
}
