"use strict";

const {
  db,
  models: { User, Product },
} = require("../server/db");
const Cart = require("../server/db/models/Cart");
const CartItem = require("../server/db/models/CartItem");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

const users = [
  {
    username: "anna",
    password: "123",
    email: "anna@email.com",
    userType: "ADMIN",
  },
  {
    username: "kristina",
    password: "123",
    email: "kristina@email.com",
    userType: "ADMIN",
  },
  {
    username: "gigi",
    password: "123",
    email: "gigi@email.com",
    userType: "ADMIN",
  },
  {
    username: "customer",
    password: "123",
    email: "customer@email.com",
    userType: "CUSTOMER",
  },
];

const products = [
  {
    name: "Calathea Vitatta",
    description:
      "This beginner-friendly Calathea is known for its green leaves with brushstroke-like cream stripes.",
    price: 10.99,
    productNumber: "xx1123",
    inventory: 100,
  },
  {
    name: "Bird’s Nest Fern",
    description: "a cat friendly plant",
    price: 10.99,
    productNumber: "xx1124",
    inventory: 100,
  },
  {
    name: "Purple Waffle Plant",
    description: "a cat friendly plant",
    price: 10.99,
    productNumber: "xx1125",
    inventory: 100,
  },
  {
    name: "Majesty Palm",
    description: "a cat friendly plant",
    price: 10.99,
    productNumber: "xx1126",
    inventory: 100,
  },
  {
    name: "Succulent",
    description: "a cat friendly plant",
    price: 10.99,
    productNumber: "xx1127",
    inventory: 100,
  },
  {
    name: "Orange Orchid",
    description: "a cat friendly plant",
    price: 10.99,
    productNumber: "xx1128",
    inventory: 100,
  },
  {
    name: "Hoya Heart Plant",
    description: "a cat friendly plant",
    price: 10.99,
    productNumber: "xx1129",
    inventory: 100,
  },
  {
    name: "Peperomia Ginny",
    description: "a cat friendly plant",
    price: 10.99,
    productNumber: "xx1130",
    inventory: 100,
  },
  {
    name: "Calathea Rattlesnake",
    description: "a cat friendly plant",
    price: 10.99,
    productNumber: "xx1131",
    inventory: 100,
  },
  {
    name: "Calathea Ornata",
    description: "a cat friendly plant",
    price: 10.99,
    productNumber: "xx1132",
    inventory: 100,
  },
  {
    name: "Snow White Waffle Plant",
    description: "a cat friendly plant",
    price: 10.99,
    productNumber: "xx1133",
    inventory: 100,
  },
  {
    name: "Pilea",
    description: "a cat friendly plant",
    price: 10.99,
    productNumber: "xx1134",
    inventory: 100,
  },
  {
    name: "Air Plant",
    description: "a cat friendly plant",
    price: 10.99,
    productNumber: "xx1135",
    inventory: 100,
  },
  {
    name: "Preserved Moss",
    description: "a cat friendly plant",
    price: 10.99,
    productNumber: "xx1136",
    inventory: 100,
  },
  {
    name: "Preserved Fern",
    description: "a cat friendly plant",
    price: 10.99,
    productNumber: "xx1137",
    inventory: 100,
  },
  {
    name: "Parlor Palm",
    description: "a cat friendly plant",
    price: 10.99,
    productNumber: "xx1138",
    inventory: 100,
  },
  {
    name: "Calathea Makoyana",
    description: "a cat friendly plant",
    price: 10.99,
    productNumber: "xx1139",
    inventory: 100,
  },
  {
    name: "Peperomia Obtusifolia",
    description: "a cat friendly plant",
    price: 10.99,
    productNumber: "xx1140",
    inventory: 100,
  },
  {
    name: "Calathea Orbifolia",
    description: "a cat friendly plant",
    price: 10.99,
    productNumber: "xx1141",
    inventory: 100,
  },
  {
    name: "Money Tree",
    description: "a cat friendly plant",
    price: 10.99,
    productNumber: "xx1142",
    inventory: 100,
  },
];
//creating cartItem
// const cartItems = await Promise.all(
//   carts.map((cart) => {
//     console.log(cart);
//     Product.create({ quantity: 1, productId: 1, cartId: 1 });
//   })
// );

// Cart.setProducts();

async function seed() {
  await db
    .sync({ force: true }) // clears db and matches models to tables
    .then(() =>
      Promise.all(users.map((user) => User.create(user))).then(() =>
        Promise.all(products.map((product) => Product.create(product))).then(
          () =>
            Promise.all(users.map((user) => Cart.create({ userId: user.id })))
        )
      )
    );
  console.log("db synced!");
  //console log our successful seeding
  console.log(`seeded ${users.length} users and ${products.length} products`);
  console.log(`seeded successfully`);
  return {
    users: {
      anna: users[0],
      kristina: users[1],
      gigi: users[2],
      customer: users[3],
    },
  };
}

console.log(Object.keys(CartItem.prototype));
/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
