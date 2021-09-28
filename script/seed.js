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
    name: "Calathea Vittata",
    description:
      "This beginner-friendly Calathea is known for its green leaves with brushstroke-like cream stripes.",
    price: 6000,
    productNumber: "xx1123",
    inventory: 100,
    imageURL: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRnLZNKZIJPm6E0JFzD_EWNctn54gf6MCmieFw4CSNY7N9pB0UskUZfDfbzt303OgkRjDSjAXaK2C3nDqIyAqwfBHGWZhC8fyCGzRg9PsAwA4UV9MuZPMZTGw&usqp=CAc"
  },
  {
    name: "Bird’s Nest Fern",
    description: "a cat friendly plant",
    price: 4500,
    productNumber: "xx1124",
    inventory: 100,
    imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQypk4bO22I7S1aFHdwpwOHmq06IwGfKsK2E77JejzeuJ0Te-2fNblMoZbTtjqEK7kZWh4Sxpw&usqp=CAc"
  },
  {
    name: "Purple Waffle Plant",
    description: "a cat friendly plant",
    price: 4800,
    productNumber: "xx1125",
    inventory: 100,
    imageURL: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSNtYXkIAlFDoQPUNXQPPsH7XsA4xhPDUscSrhgeWUCRsUAy9_D1mWYLzgwMvNifSihuzpVEz6yCxunuv2DJZAUCuiD0KpAF9wqkjZ0eGi_HjNS66ljPriE&usqp=CAc"
  },
  {
    name: "Majesty Palm",
    description: "a cat friendly plant",
    price: 5100,
    productNumber: "xx1126",
    inventory: 100,
    imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiI19qhcZzIQgA5YWOBkF4KZOhmtyoqTQOpPNhpuuW26r2fkgxB9QJ03fg3H5NziYK751724wg&usqp=CAc"
  },
  {
    name: "Succulent",
    description: "a cat friendly plant",
    price: 4500,
    productNumber: "xx1127",
    inventory: 100,
    imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzjNwhEShQfFOvU3ttZYZ0DRGjBKcWfCJFcQ&usqp=CAU"
  },
  {
    name: "Orange Orchid",
    description: "a cat friendly plant",
    price: 6500,
    productNumber: "xx1128",
    inventory: 100,
    imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXGY52_u5Mm7ofmVGiO4Wh6jd1_hTZE0RQCJ2O2EiMK66hhSAHpT_cLZUpSPpXL0JFyt7v5v8&usqp=CAc"
  },
  {
    name: "Hoya Heart Plant",
    description: "a cat friendly plant",
    price: 4000,
    productNumber: "xx1129",
    inventory: 100,
    imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTn1UtrD4JT9mtILkjSwOD70zcM6jH4fSmSxlgDZY7UxYrzRQBw1jSsU7z3zgz66wyj-Bzh-9t&usqp=CAc"
  },
  {
    name: "Peperomia Ginny",
    description: "a cat friendly plant",
    price: 3500,
    productNumber: "xx1130",
    inventory: 100,
    imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ41g_n4TKRIWYG34QPTUGbILniS6Rf0LXJCAxsYpcvHZAuyRZyxGiPn7GO1-GU25M8GkyVRWZo&usqp=CAc"
  },
  {
    name: "Calathea Rattlesnake",
    description: "a cat friendly plant",
    price: 6200,
    productNumber: "xx1131",
    inventory: 100,
    imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThdP04nHO6M9W3sqza4KWlMvzgXdmM0jZvPnt0LBZB48ncmTkMF0zI5lo502DMqRVMgUYQCdQ&usqp=CAc"
  },
  {
    name: "Calathea Ornata",
    description: "a cat friendly plant",
    price: 4200,
    productNumber: "xx1132",
    inventory: 100,
    imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROmJfi_nG-m6kSL9IiE_tsLoxc1oPk_KiroQ&usqp=CAU"
  },
  {
    name: "Snow White Waffle Plant",
    description: "a cat friendly plant",
    price: 3500,
    productNumber: "xx1133",
    inventory: 100,
    imageURL: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQWwO2sw0Xg7kJK7Y12DAbbVlM1mIQ_RxPEwKYdNywWRlFXsQkZOE8AOS7N0rbxxlP5RM_RCA2DIgnJ3MyamztaPc4v9DhiFR3BIlcAFquTGcf_pwpuA8SP&usqp=CAc"
  },
  {
    name: "Pilea",
    description: "a cat friendly plant",
    price: 2500,
    productNumber: "xx1134",
    inventory: 100,
    imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe1aTQNikC6xMFd5mQHJycObW4leKeMqAH5KDi8NIeptmqQA_nKUtZndsBT0gGzIrpT0_lbVRF&usqp=CAc"
  },
  {
    name: "Air Plant",
    description: "a cat friendly plant",
    price: 1500,
    productNumber: "xx1135",
    inventory: 100,
    imageURL: "https://i.pinimg.com/originals/96/44/87/964487d3ef9ec6c6ab8fc9feca05c705.jpg"
  },
  {
    name: "Preserved Moss",
    description: "a cat friendly plant",
    price: 6500,
    productNumber: "xx1136",
    inventory: 100,
    imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtS7dj4RK0NJKJkHd-wnrzKII3L3ueQzN4Og&usqp=CAU"
  },
  {
    name: "Preserved Fern",
    description: "a cat friendly plant",
    price: 4500,
    productNumber: "xx1137",
    inventory: 100,
    imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWYfLXbMlLilF4h4OCCkwy4kbBs3O5KSejKS18mmXmfxbDG5cvRrfKZuFfXNEGuiknX6Z_Dcc&usqp=CAc"
  },
  {
    name: "Parlor Palm",
    description: "a cat friendly plant",
    price: 7500,
    productNumber: "xx1138",
    inventory: 100,
    imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTElaWuhEGRXyBbukXZPe-4dAP2PdNzVzr5glEUkSHIG2XPE1t8bXuXFOHccZnT8tQPcFFVTl0&usqp=CAc"
  },
  {
    name: "Calathea Makoyana",
    description: "a cat friendly plant",
    price: 3500,
    productNumber: "xx1139",
    inventory: 100,
    imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO6nyn9itVbIYaBl6z4QD_50nACdOJ4lDfbEAOoyBNdeow5rKCO5pTV2XLTE9-w0Ub8nx4ZUtyWg&usqp=CAc"
  },
  {
    name: "Peperomia Obtusifolia",
    description: "a cat friendly plant",
    price: 2500,
    productNumber: "xx1140",
    inventory: 100,
    imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1l_gX3-NNV49z6Xm6yDSa-9Fe3OhDm1kBYda9QiAgz9_B_2vYqybzHyHm5BrvG1JMzrP058k&usqp=CAc"
  },
  {
    name: "Calathea Orbifolia",
    description: "a cat friendly plant",
    price: 4200,
    productNumber: "xx1141",
    inventory: 100,
    imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9T_LeI8sLvjtvTDpUzgi4PbLCVkclF-4PgesceooBj8C5UrM1mmH1deBkDw&usqp=CAc"
  },
  {
    name: "Money Tree",
    description: "a cat friendly plant",
    price: 6500,
    productNumber: "xx1142",
    inventory: 100,
    imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOLrkm8TU_5CU88LafcxtGP_aOkIbJhSL8sA&usqp=CAU"
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
