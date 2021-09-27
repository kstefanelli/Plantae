"use strict";

const {
  db,
  models: { User, Product },
} = require("../server/db");
const Order = require("../server/db/models/Order");
const CartItem = require("../server/db/models/CartItem");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

const products = [
  {
    name: "Calathea Vitatta",
    description:
      "This beginner-friendly Calathea is known for its green leaves with brushstroke-like cream stripes.",
    price: 1099,
    productNumber: "xx1123",
    inventory: 100,
  },
  {
    name: "Bird’s Nest Fern",
    description: "a cat friendly plant",
    price: 1099,
    productNumber: "xx1124",
    inventory: 100,
  },
  {
    name: "Purple Waffle Plant",
    description: "a cat friendly plant",
    price: 1099,
    productNumber: "xx1125",
    inventory: 100,
  },
  {
    name: "Majesty Palm",
    description: "a cat friendly plant",
    price: 1099,
    productNumber: "xx1126",
    inventory: 100,
  },
  {
    name: "Succulent",
    description: "a cat friendly plant",
    price: 1099,
    productNumber: "xx1127",
    inventory: 100,
  },
  {
    name: "Orange Orchid",
    description: "a cat friendly plant",
    price: 1099,
    productNumber: "xx1128",
    inventory: 100,
  },
  {
    name: "Hoya Heart Plant",
    description: "a cat friendly plant",
    price: 1099,
    productNumber: "xx1129",
    inventory: 100,
  },
  {
    name: "Peperomia Ginny",
    description: "a cat friendly plant",
    price: 1099,
    productNumber: "xx1130",
    inventory: 100,
  },
  {
    name: "Calathea Rattlesnake",
    description: "a cat friendly plant",
    price: 1099,
    productNumber: "xx1131",
    inventory: 100,
  },
  {
    name: "Calathea Ornata",
    description: "a cat friendly plant",
    price: 1099,
    productNumber: "xx1132",
    inventory: 100,
  },
  {
    name: "Snow White Waffle Plant",
    description: "a cat friendly plant",
    price: 1099,
    productNumber: "xx1133",
    inventory: 100,
  },
  {
    name: "Pilea",
    description: "a cat friendly plant",
    price: 1099,
    productNumber: "xx1134",
    inventory: 100,
  },
  {
    name: "Air Plant",
    description: "a cat friendly plant",
    price: 1099,
    productNumber: "xx1135",
    inventory: 100,
  },
  {
    name: "Preserved Moss",
    description: "a cat friendly plant",
    price: 1099,
    productNumber: "xx1136",
    inventory: 100,
  },
  {
    name: "Preserved Fern",
    description: "a cat friendly plant",
    price: 1099,
    productNumber: "xx1137",
    inventory: 100,
  },
  {
    name: "Parlor Palm",
    description: "a cat friendly plant",
    price: 1099,
    productNumber: "xx1138",
    inventory: 100,
  },
  {
    name: "Calathea Makoyana",
    description: "a cat friendly plant",
    price: 1099,
    productNumber: "xx1139",
    inventory: 100,
  },
  {
    name: "Peperomia Obtusifolia",
    description: "a cat friendly plant",
    price: 1099,
    productNumber: "xx1140",
    inventory: 100,
  },
  {
    name: "Calathea Orbifolia",
    description: "a cat friendly plant",
    price: 1099,
    productNumber: "xx1141",
    inventory: 100,
  },
  {
    name: "Money Tree",
    description: "a cat friendly plant",
    price: 1099,
    productNumber: "xx1142",
    inventory: 100,
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true });

    const anna = await User.create({
      username: "anna",
      password: "123",
      email: "anna@email.com",
      userType: "ADMIN",
    });
    const kristina = await User.create({
      username: "kristina",
      password: "123",
      email: "kristina@email.com",
      userType: "ADMIN",
    });
    const gigi = await User.create({
      username: "gigi",
      password: "123",
      email: "gigi@email.com",
      userType: "ADMIN",
    });
    const customer = await User.create({
      username: "customer",
      password: "123",
      email: "customer@email.com",
      userType: "CUSTOMER",
    });

    const newProducts = await products.map((product) => {
      Product.create(product);
    });

    let order1 = await Order.create({ userId: anna.id });
    let order2 = await Order.create({ userId: kristina.id });
    let order3 = await Order.create({ userId: gigi.id });
    let order4 = await Order.create({ userId: customer.id });
    let order5 = await Order.create({
      userId: gigi.id,
      orderStatus: "FULFILLED",
    });

    await CartItem.create({ orderId: order1.id, productId: 1 });
    await CartItem.create({ orderId: order2.id, productId: 1 });
    await CartItem.create({ orderId: order3.id, productId: 1 });
    await CartItem.create({ orderId: order3.id, productId: 2 });
    await CartItem.create({ orderId: order4.id, productId: 1 });
    await CartItem.create({ orderId: order5.id, productId: 1 });
  } catch (err) {
    console.log(err);
  }
};

//updated the seed to reflect cart --> order changes

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
