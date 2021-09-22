const Sequelize = require("sequelize");
const db = require("../db");

const CartItem = db.define("CartItem", {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  priceAtCheckout: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  }
});

module.exports = CartItem;
