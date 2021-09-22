//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");
const CartItem = require("./models/CartItem");

//user and order
User.hasMany(Order);
Order.belongsTo(User);

//Product and Cart Item
Product.belongsToMany(Order, { through: CartItem });
Order.belongsToMany(Product, { through: CartItem });

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    CartItem
  },
};

//updated associations, imports, exports
