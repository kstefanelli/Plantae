//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");
const Cart = require("./models/Cart");
const CartItem = require("./models/CartItem");

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
Product.belongsToMany(Cart, { through: CartItem });
Cart.belongsToMany(Product, { through: CartItem });

module.exports = {
  db,
  models: {
    User,
    Product,
    Cart,
    Order,
    CartItem
  },
};
