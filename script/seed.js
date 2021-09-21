'use strict'

const {db, models: {User, Product} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'anna', password: '123', email: 'anna@email.com', userType: 'ADMIN' }),
    User.create({ username: 'kristina', password: '123', email:'kristina@email.com', userType: 'ADMIN' }),
    User.create({ username: 'gigi', password: '123', email:'gigi@email.com', userType: 'ADMIN' }),
    User.create({ username: 'customer', password: '123', email:'customer@email.com', userType: 'CUSTOMER' }),
  ])

//Creating Products
  const products = await Promise.all([
    Product.create({ name: 'Calathea Vitatta', description: 'This beginner-friendly Calathea is known for its green leaves with brushstroke-like cream stripes.', price: 10.99, productNumber: 'xx1123', inventory: 100 }),
    Product.create({ name: 'Bird’s Nest Fern', description: 'a cat friendly plant', price: 10.99, productNumber: 'xx1124', inventory: 100}),
    Product.create({ name: 'Purple Waffle Plant', description: 'a cat friendly plant', price: 10.99, productNumber: 'xx1125', inventory: 100}),
    Product.create({ name: 'Majesty Palm', description: 'a cat friendly plant', price: 10.99, productNumber: 'xx1126', inventory: 100}),
    Product.create({ name: 'Succulent', description: 'a cat friendly plant', price: 10.99, productNumber: 'xx1127', inventory: 100}),
    Product.create({ name: 'Orange Orchid', description: 'a cat friendly plant', price: 10.99, productNumber: 'xx1128', inventory: 100}),
    Product.create({ name: 'Hoya Heart Plant', description: 'a cat friendly plant', price: 10.99, productNumber: 'xx1129', inventory: 100}),
    Product.create({ name: 'Peperomia Ginny', description: 'a cat friendly plant', price: 10.99, productNumber: 'xx1130', inventory: 100}),
    Product.create({ name: 'Calathea Rattlesnake', description: 'a cat friendly plant', price: 10.99, productNumber: 'xx1131', inventory: 100}),
    Product.create({ name: 'Calathea Ornata', description: 'a cat friendly plant', price: 10.99, productNumber: 'xx1132', inventory: 100}),
    Product.create({ name: 'Snow White Waffle Plant', description: 'a cat friendly plant', price: 10.99, productNumber: 'xx1133', inventory: 100}),
    Product.create({ name: 'Pilea', description: 'a cat friendly plant', price: 10.99, productNumber: 'xx1134', inventory: 100})
    ,
    Product.create({ name: 'Air Plant', description: 'a cat friendly plant', price: 10.99, productNumber: 'xx1135', inventory: 100})
    ,
    Product.create({ name: 'Preserved Moss', description: 'a cat friendly plant', price: 10.99, productNumber: 'xx1136', inventory: 100}),
    Product.create({ name: 'Preserved Fern', description: 'a cat friendly plant', price: 10.99, productNumber: 'xx1137', inventory: 100}),
    Product.create({ name: 'Parlor Palm', description: 'a cat friendly plant', price: 10.99, productNumber: 'xx1138', inventory: 100}),
    Product.create({ name: 'Calathea Makoyana', description: 'a cat friendly plant', price: 10.99, productNumber: 'xx1139', inventory: 100}),
    Product.create({ name: 'Peperomia Obtusifolia', description: 'a cat friendly plant', price: 10.99, productNumber: 'xx1140', inventory: 100}),
    Product.create({ name: 'Calathea Orbifolia', description: 'a cat friendly plant', price: 10.99, productNumber: 'xx1141', inventory: 100}),
    Product.create({ name: 'Money Tree', description: 'a cat friendly plant', price: 10.99, productNumber: 'xx1142', inventory: 100}),
  ])
  //console log our successful seeding
  console.log(`seeded ${users.length} users and ${products.length} products`)
  console.log(`seeded successfully`)
  return {
    users: {
      anna: users[0],
      kristina: users[1],
      gigi: users[2],
      customer: users[3]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
