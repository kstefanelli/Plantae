//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");

//user and order
User.hasMany(Order);
Order.belongsTo(User);

//product and order
Product.belongsToMany(Order, { through: "orderItem" });
Order.belongsToMany(Product, { through: "orderItem" });

//User and Shopping Session
Cart.belongsTo(User);
User.hasOne(Cart);

//Product and Cart Item
Product.belongsToMany(Cart, { through: "cartItem" });
Cart.belongsToMany(Product, { through: "cartItem" });

module.exports = {
  db,
  models: {
    User,
  },
};
