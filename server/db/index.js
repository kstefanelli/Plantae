//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");

//user and order
User.hasMany(Order);
Order.belongsTo(User);

//product and order
Product.belongsToMany(Order, { through: "orderItem" });
Order.hasMany(Product);

//User and Shopping Session
User.belongsTo(ShoppingSession);
ShoppingSession.hasOne(User);

//User and Cart Item
Product.belongsToMany(CartItem, { through: "productCart" });
CartItem.hasMany(Product);

module.exports = {
  db,
  models: {
    User,
  },
};
